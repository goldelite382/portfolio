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
	
	
	
	listPosts(req, res, next) {
		this.db.query("SELECT id, title, locked FROM posts",
			function(err, result, fields) {
				if(err) this.postError(res, err);
				else		res.send({ result: result });
				next();
			});
	}
	
	
	getPost(req, res, next) {
		this.db.query("SELECT id, title, content, locked FROM posts WHERE id=?", [ req.params.id ],
			function(err, result, fields) {
				if(err)	this.postError(res, err);
				else		res.send({ result: result[0] });
				next();
			});
	}
	
	
	createPost(req, res, next) {
		this.db.getConnection(function(err, connection) {
			// Add the data to the database
			connection.query("INSERT INTO posts (title, content, locked) VALUES (?, ?, 0)",
				[ req.body.title || '', req.body.content || '' ],
				function(err, result, fields) {
					if(err)	{ this.postError(res, err); next(); }
					else		{
					
						// Get the ID of what we inserted so our caller knows what they made
						connection.query("SELECT LAST_INSERT_ID() AS lii",
							function(err, result, fields) {
								if(err) this.postError(res, err);
								else		res.send({ result: { id: result[0].lii }});
								
								connection.release();
								next();
							});
					}
				});
		});
	}
	
	
	updatePost(req, res, next) {
		this.db.query("UPDATE posts SET title=?, content=? WHERE id=?",
			[ req.body.title || '', req.body.content || '', req.body.id ],
			function(err, result, fields) {
				if(err)	this.postError(res, err);
				else		res.send({ result: result[0] });
				next();
			});
	}
	
	
	deletePost(req, res, next) {
		this.db.query("DELETE FROM posts WHERE id=?",
			[ req.params.id ],
			function(err, result, fields) {
				if(err)	this.postError(res, error);
				else		res.send({ result: "Success" });
				next();
			});
	}
	
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		console.error(error);
		res.send({ error: err.sqlMessage || err });
	}
}

module.exports = Post;
