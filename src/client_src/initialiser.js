const util = require('util');

import * as dbPostActions from '../common_src/db_post'
import { loadPostTitlesSucc, loadPostBodySucc } from '../client_src/actions/posts'


export async function initialiseSession(store, db) {
	let posts = await dbPostActions.getPostList(db, null);
	await store.dispatch( loadPostTitlesSucc({ posts : posts }) );
	
	let postbody = await dbPostActions.getPost(db, posts[0].authorid, posts[0].id);
	await store.dispatch( loadPostBodySucc({ post : postbody[0] }) );
}
