import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


import rootReducer from './reducer_head';

const util = require('util');
const loggerMiddleware = createLogger();


export function createAppStore(initialstate) {
	return  createStore(
				rootReducer,
				initialstate,
				applyMiddleware( thunkMiddleware )//, loggerMiddleware )
			);
}
								
								
								
								

import * as dbPostActions from '../common_src/db_post'
import { loadPostTitlesSucc, loadPostBodySucc } from './forum/actions/posts'

export async function manuallyInitialiseStore(store, db) {
	let posts = await dbPostActions.getPostList(db, null);
	await store.dispatch( loadPostTitlesSucc({ posts : posts }) );
	
	let postbody = await dbPostActions.getPost(db, posts[0].authorid, posts[0].id);
	await store.dispatch( loadPostBodySucc({ post : postbody[0] }) );
}
