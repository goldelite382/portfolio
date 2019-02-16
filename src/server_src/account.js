'use strict';

const util = require('util');

const DEFAULT_USER_PERMISSIONS = 'POST_ADMIN';

const valid_actions = [
		'user-create',
	];

class Account {
	constructor(router, dbconnection) {
		this.db = dbconnection;
		
		this.getUserFromID = this.getUserFromID.bind(this);
		this.getUserFromName = this.getUserFromName.bind(this);
		
		this.createUserAccount = this.createUserAccount.bind(this);
		this.updateUserAccount = this.updateUserAccount.bind(this);
		
		router.get('/api/user/:id', this.getUserFromID);
		router.get('/api/user/byname/:name', this.getUserFromName);
		
		router.post('/api/user', this.createUserAccount);
		router.put('/api/user', this.updateUserAccount);
	}
	
	async getUserFromID(req, res, next) {
		res.send("Got user ID");
	}
	
	async getUserFromName(req, res, next) {
		res.send("Got user name");
	};
	
	async createUserAccount(req, res, next) {
		try {
			//let auths = await this.myauth.checkActionAuths(req, 'user-create');
			//if(!auths[user-create])
			//	throw("User does not have permissions to create a post");
			
			let connection = await this.db.getConnection();
			connection.query = util.promisify(connection.query);
		
			// Add the data to the database
			let result = await connection.query("INSERT INTO useraccounts (username, password, email, permission_groups) VALUES (?, ?, ?, ?)",
											[ req.body.username, req.body.password, req.body.email, DEFAULT_USER_PERMISSIONS ]);
			
			let userid = await connection.query("SELECT LAST_INSERT_ID() lii");
			
			if(userid[0].lii)
				res.send({ result: 'success' });
			else
				throw "Couldn't create user account";
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	async updateUserAccount(req, res, next) {
	}
	
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		console.log(error);
		res.send({ result: 'error', error: error.sqlMessage || error.message || error });
	}
}

module.exports = Account
