'use strict';

class Post {
	constructor(router, dbConnection) {
		this.db = dbConnection;
		
		this.listPosts = this.listPosts.bind(this);
		this.getPost = this.getPost.bind(this);
		this.createPost = this.createPost.bind(this);
		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		
		router.get(   '/post',     this.listPosts);
		router.get(   '/post/:id', this.getPost);
		router.post(  '/post/',    this.createPost);
		router.put(   '/post/',    this.updatePost);
		router.delete('/post/:id', this.deletePost);
	}
	
	
	
	async listPosts(req, res, next) {
		try {
			req.session.cookie.expires = false;
			
			console.log("Listing posts for " + req.session.userid);
			let result = await this.db.query("SELECT id, title, locked FROM posts WHERE public=1 OR authorid=?",
											[ req.session.userid ]);
											
			res.send({ result: 'success', posts: result });
		} catch(err) {
			this.postError(res, err);
		}
		next();
	}
	
	
	async getPost(req, res, next) {
		try {
			console.log("Getting post " + req.params.id + " for userid " + req.session.userid);
			
			let result = await this.db.query("SELECT p.id, p.title, p.content, p.locked, p.authorid, ua.username AS author FROM posts p " +
												"INNER JOIN useraccounts ua ON ua.id=p.authorid " +
												"WHERE p.id=? AND (p.public=1 OR p.authorid=?)",
											[ req.params.id, req.session.userid ]);
											
			res.send({ result: 'success', post: result[0] });
		} catch (err) {
			this.postError(res, err);
		};
		next();
	}
	
	
	async createPost(req, res, next) {
		try {
			this.db.getConnection(async function(err, connection) {
				// Add the data to the database
				let result = await connection.query("INSERT INTO posts (title, content, locked) VALUES (?, ?, 0)",
												[ req.body.title || '', req.body.content || '' ]);
				let id = await connection.query("SELECT LAST_INSERT_ID() AS lii");
				res.send({ result: 'success', newid: result[0].lii });
				
				connection.release();
			});
		} catch(err) {
			this.postError(res, err);
		}
		next();
	}
	
	
	async updatePost(req, res, next) {
		try {
			let result = await this.db.query("UPDATE posts SET title=?, content=? WHERE id=?",
										[ req.body.title || '', req.body.content || '', req.body.id ]);
			res.send({ result: 'Success' });
		} catch(err) {
			this.postError(res, err);
		}
		next();
	}
	
	
	async deletePost(req, res, next) {
		try {
			let result = await this.db.query("DELETE FROM posts WHERE id=?",
									[ req.params.id ]);
			res.send({ result: 'Success' });
		} catch(err) {
			this.postError(res, err);
		}
		next();
	}
	
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		console.error(error);
		res.send({ error: error.sqlMessage || error.message || error });
	}
}

module.exports = Post;
