'use strict'

const DEFAULT_TOKEN_EXPIRY = '20 SECOND'

class Account {
	constructor(router, dbconnection) {
		this.db = dbconnection;
		
		this.getUserFromID = this.getUserFromID.bind(this);
		this.getUserFromName = this.getUserFromName.bind(this);
		this.generateUserToken = this.generateUserToken.bind(this);
		this.validateUserToken = this.validateUserToken.bind(this);
		this.destroyUserToken = this.destroyUserToken.bind(this);
		this.createUserAccount = this.createUserAccount.bind(this);
		this.updateUserAccount = this.updateUserAccount.bind(this);
		
		router.get('/user/:id', this.getUserFromID);
		router.get('/user/byname/:name', this.getUserFromName);
		router.post('/user/account', this.createUserAccount);
		router.put('/user/account', this.updateUserAccount);
		
		router.post('/auth/', this.generateUserToken);
		router.get('/auth/:userid/:token', this.validateUserToken);
		router.delete('/auth/:userid/:token', this.destroyUserToken);
		
	}
	
	async getUserFromID(req, res, next) {
		res.send("Got user ID");
		next();
	}
	
	async getUserFromName(req, res, next) {
		res.send("Got user name");
		next();
	};
	
	
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
			
			let result = await this.db.query("INSERT INTO usertokens (userid, address, platform, token, expiry) VALUES (?, ?, ?, ?, ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + "))",
											[ useraccount[0].id, address, platform, 'token' ]);
			let tokenid = await this.db.query("SELECT token FROM usertokens WHERE userid=? AND address=? AND platform=? AND expiry>now()",
											[ useraccount[0].id, address, platform ]);

			console.log("Generating token; saving " + useraccount[0].id + ", " + tokenid[0].token);
		    req.session.userid = useraccount[0].id;
		    req.session.token = tokenid[0].token;
		    console.log("Session info, userid: " + req.session.userid + ", token: " + req.session.token);
		    
			res.send({	result: 'success',
						token: tokenid[0].token,
						userid: useraccount[0].id,
						username: useraccount[0].username,
						 });
		} catch(err) {
			this.postError(res, err);
		}
		next();
	}
	
	//requires: userid, token
	async validateUserToken(req, res, next) {
		try {
			let token = await this.db.query("SELECT userid, token FROM usertokens WHERE userid=? AND address=? AND platform=? AND token=? AND expiry>now()",
											[ req.params.userid, req.connection.remoteAddress, req.headers['user-agent'], req.params.token ]);
			
			if(token.length) {
				await this.db.query("UPDATE usertokens SET expiry=ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + ") WHERE id=?",
									[ token[0].token ]);
									
				res.send({ result: 'valid', userid: token[0].userid, token: token[0].token });
			} else {
				res.send({ result: 'invalid' });
			}
		} catch(err) {
			this.postError(res, err);
		}
		
		next();
	}
	
	//requires: userid, token
	async destroyUserToken(req, res, next) {
		try {
			await this.db.query("DELETE FROM usertokens WHERE userid=? AND token=?",
								[ req.params.userid, req.params.token ]);
			
			req.session.userid = null;
			req.session.token = null;
			
			
			res.send({ result: 'success' });
		} catch(err) {
			this.postError(res, err);
		}
		
		next();
	}
	
	async createUserAccount(req, res, next) {
		next();
	}
	
	async updateUserAccount(req, res, next) {
		next();
	}
	
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		res.send({ result: 'error', error: error.sqlMessage || error.message || error });
		console.log(error);
	}
}

module.exports = Account
