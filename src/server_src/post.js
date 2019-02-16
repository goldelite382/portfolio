'use strict';

const util = require('util');
import * as dbPostActions from '../common_src/db_post'

const valid_actions = [
		'post-list',
		'post-read',
		'post-create',
		'post-update',
		'post-delete',
	];
	
class Post {
	constructor(router, dbConnection, myauth) {
		this.db = dbConnection;
		this.myauth = myauth;
		
		this.listPosts = this.listPosts.bind(this);
		this.getPost = this.getPost.bind(this);
		this.createPost = this.createPost.bind(this);
		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		
		router.get(   '/api/post',     this.listPosts);
		router.get(   '/api/post/:id', this.getPost);
		router.post(  '/api/post/',    this.createPost);
		router.put(   '/api/post/',    this.updatePost);
		router.delete('/api/post/:id', this.deletePost);
	}
	
	
	
	async listPosts(req, res, next) {
		try {
			//let auths = await this.myauth.checkActionAuths(req, 'post-list');
			//if(!auths['post-list'])
			//	throw("User does not have permissions to list posts");
			console.log("Listing posts [from web interface]");
			
			let result = await dbPostActions.getPostList(this.db, req.session.userid);
											
			res.send({ result: 'success', posts: result });
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	async getPost(req, res, next) {
		try {
			//let auths = await this.myauth.checkActionAuths(req, 'post-read');
			//if(!auths['post-read'])
			//	throw("User does not have permissions to read post");
			
			let result = await this.db.query("SELECT p.id, p.title, p.content, p.locked AS isLocked, public as isPublic, p.authorid, ua.username AS author FROM posts p " +
												"INNER JOIN useraccounts ua ON ua.id=p.authorid " +
												"WHERE p.id=? AND (p.public=1 OR p.authorid=?)",
											[ req.params.id, req.session.userid || 0 ]);
											
			res.send({ result: 'success', post: result[0] || null });
		} catch (err) {
			this.postError(res, err);
		};
	}
	
	
	async createPost(req, res, next) {
		try {
			let auths = await this.myauth.checkActionAuths(req, 'post-create');
			if(!auths['post-create'])
				throw("User does not have permissions to create a post");
			
			let connection = await this.db.getConnection();
			connection.query = util.promisify(connection.query);
		
			// Add the data to the database
			let result = await connection.query("INSERT INTO posts (authorid, title, content, locked, public) VALUES (?, ?, ?, ?, ?)",
											[ req.session.userid, req.body.title || '', req.body.content || '',
												req.body.isLocked || 0, req.body.isPublic || 0 ]);
		
			let insertid = await connection.query("SELECT LAST_INSERT_ID() AS lii");
			
			res.send({ result: 'success', newid: insertid[0].lii });
		
			connection.release();
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	async updatePost(req, res, next) {
		try {
			let auths = await this.myauth.checkActionAuths(req, 'post-update');
			if(!auths['post-update'])
				throw("User does not have permissions to update a post");
			
			let result = await this.db.query("UPDATE posts SET title=?, content=?, locked=?, public=? WHERE id=? AND authorid=?",
										[ req.body.title || '', req.body.content || '', req.body.isLocked || 0,
											req.body.isPublic || 0, req.body.id, req.session.userid ]);
			res.send({ result: 'success' });
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	async deletePost(req, res, next) {
		try {
			let auths = await this.myauth.checkActionAuths(req, 'post-delete');
			if(!auths['post-delete'])
				throw("User does not hav epermissions to delete a post");
			
			let result = await this.db.query("DELETE FROM posts WHERE id=?",
									[ req.params.id ]);
			res.send({ result: 'success' });
		} catch(err) {
			this.postError(res, err);
		}
	}
	
	
	
	// Quick util function to output and send an error
	postError(res, error) {
		console.log(error);
		res.send({ error: error.sqlMessage || error.message || error });
	}
}

module.exports = Post;
