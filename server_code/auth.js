'use strict'

const DEFAULT_TOKEN_EXPIRY = '20 DAY'

class Auth {
	constructor(router, dbconnection) {
		this.db = dbconnection;
		
		this.validateUserToken = this.validateUserToken.bind(this);
	}
	
	//requires: userid, token
	async validateUserToken(req) {
		try {
			console.log(req.session.userid + ", " + req.connection.remoteAddress + ", " + req.headers['user-agent'] + ', ' + req.session.token);
			let token = await this.db.query("SELECT userid, token FROM usertokens WHERE userid=? AND address=? AND platform=? AND token=? AND expiry>now()",
											[ req.session.userid, req.connection.remoteAddress, req.headers['user-agent'], req.session.token ]);
			
			if(token.length) {
				await this.db.query("UPDATE usertokens SET expiry=ADDDATE(now(), INTERVAL " + DEFAULT_TOKEN_EXPIRY + ") WHERE id=?",
									[ token[0].token ]);
									
			    
			    
				return { userid: token[0].userid } ;
			} else {
				return null;
			}
		} catch(err) {
			return null;
		}
		
		return null;
	}
}

module.exports = Auth
