'use strict'

const DEFAULT_TOKEN_EXPIRY = '20 DAY'


class Auth {
	constructor(router, dbconnection) {
		this.db = dbconnection;
		
		this.checkActionAuths = this.checkActionAuths.bind(this);
		this.resolvePermissionGroup = this.resolvePermissionGroup.bind(this);
		
		this.generateUserToken = this.generateUserToken.bind(this);
		this.checkUserToken = this.checkUserToken.bind(this);
		this.updateUserToken = this.updateUserToken.bind(this);
		this.destroyUserToken = this.destroyUserToken.bind(this);
		
		router.post('/api/auth/', this.generateUserToken);
		router.post('/api/auth/update', this.updateUserToken);
		router.get('/api/auth/check', this.checkUserToken);
		router.delete('/api/auth/', this.destroyUserToken);
	}
	
	async checkActionAuths(req, actions) {
		if(!Array.isArray(actions))
			actions = [actions];
			
		try {
			let token = await this.db.query("SELECT ut.userid, ua.permission_groups, ut.token FROM usertokens ut " +
												"INNER JOIN useraccounts ua ON ua.id=ut.userid " +
												"WHERE ut.userid=? AND ut.address=? AND ut.platform=? AND ut.token=? AND ut.expiry>now() " +
												"ORDER BY expiry DESC " +
												"LIMIT 1",
											[ req.session.userid, req.connection.remoteAddress, req.headers['user-agent'], req.session.token ]);
											
			if(!token.length)
				throw "Invalid authentication token. Please log in.";
			
			await this.db.query("UPDATE usertokens SET expiry=ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + ") " +
									"WHERE userid=? AND token=?",
									[ req.session.userid, req.session.token ]);
									
			
			let perms = await this.resolvePermissionGroup(token[0].permission_groups);
			let actionsAuthed = {};
			for(var i = 0; i < actions.length; i++) {
				let isAuthed = false;
				
				for(var p = 0; p < perms.length; p++) {
					if(perms[p] === actions[i]) { isAuthed = true; break; }
				}
				
				actionsAuthed[actions[i]] = isAuthed;
			}
			
			return actionsAuthed;
		} catch(err) {
			return {};
		}
	}
	
	
	
	async resolvePermissionGroup(groups) {
		let permissionList = [];
		
		let groupNames = groups.split(' ');
		for(var i = 0; i < groupNames.length; i++) {
			let permissions = await this.db.query("SELECT permissions FROM permissiongroups WHERE name=?", groupNames[i]);
			
			for(var p = 0; p < permissions.length; p++) {
				let permissionNames = permissions[p].permissions.split(' ');
				
				for(var pn = 0; pn < permissionNames.length; pn++) {
					if(permissionNames[pn].substr(0, 1) === '%')
						permissionList = permissionList.concat(await this.resolvePermissionGroup(permissionNames[pn].substr(1)));
					else
						permissionList.push(permissionNames[pn]);
				}
			}
		}
		
		return permissionList;
	}
	
	
	//requires: username, password
	async generateUserToken(req, res, next) {
		try  {
			let useraccount = await this.db.query("SELECT id, username FROM useraccounts WHERE username=? and password=?",
												[ req.body.username, req.body.password ]);
			if(!useraccount.length) throw ("Username not found or password incorrect.");
			
			let address = req.connection.remoteAddress;
			let platform = req.headers['user-agent'];
			
			// Clean up old tokens
			await this.db.query("DELETE FROM usertokens WHERE expiry<now()");
			
			// Create a random token
			let new_token = Math.random().toString(36).substr(2);
			
			let result = await this.db.query("INSERT INTO usertokens (userid, address, platform, token, expiry) VALUES (?, ?, ?, ?, ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + "))",
											[ useraccount[0].id, address, platform, new_token ]);
			let tokenid = await this.db.query("SELECT token FROM usertokens WHERE userid=? AND address=? AND platform=? AND expiry>now()",
											[ useraccount[0].id, address, platform ]);

		    req.session.token = tokenid[0].token;
		    req.session.userid = useraccount[0].id;
		    req.session.username = useraccount[0].username;
		    
			res.send({	result: 'success',
						token: tokenid[0].token,
						userid: useraccount[0].id,
						username: useraccount[0].username,
						 });
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	// Description: Check if a user token is still valid
	//requires: -
	async checkUserToken(req, res, next) {
		try {
			let token = await this.db.query("SELECT ut.userid, ua.username, ut.token FROM usertokens ut " +
											"INNER JOIN useraccounts ua ON ua.id=ut.userid " +
											"WHERE ut.userid=? AND ut.address=? AND ut.platform=? AND ut.token=? AND ut.expiry>now()",
											[ req.session.userid, req.connection.remoteAddress, req.headers['user-agent'], req.session.token ]);
			
			if(token.length) {
				res.send({ result: 'success', userid: token[0].userid, username: token[0].username, token: token[0].token });
			} else {
				res.send({ result: 'failure', error: "Invalid or expired user token" });
			}
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	// Description: Update a user token, if it's still valid
	async updateUserToken(req, res, next) {
		try {
			console.log("Getting token...");
			let token = await this.db.query("SELECT id, token FROM usertokens WHERE userid=? AND address=? AND platform=? AND token=? AND expiry>now()",
											[ req.session.userid, req.connection.remoteAddress, req.headers['user-agent'], req.session.token ]);
			console.log(token);
			
			if(token.length) {
				console.log("Updating token...");
				await this.db.query("UPDATE usertokens SET expiry=ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + ") WHERE id=?",
									[ token[0].id ]);
				console.log("Done");
				
				res.send({ result: 'success', token: token[0].token });
			} else {
				console.log("No token");
				res.send({ result: 'failure', error: "Invalid or expired user token." });
			}
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	//requires: -
	async destroyUserToken(req, res, next) {
		try {
			await this.db.query("DELETE FROM usertokens WHERE userid=? AND token=?",
								[ req.session.userid, req.session.token ]);
			
			req.session.userid = null;
			req.session.token = null;
			
			
			res.send({ result: 'success' });
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		console.log(error);
		res.send({ result: 'error', error: error.sqlMessage || error.message || error });
	}
}

module.exports = Auth
