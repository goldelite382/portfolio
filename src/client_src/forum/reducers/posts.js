import { showMessage } from '../../action_head'
import * as postActs from '../actions/posts';
		
		
export const postTitles = (state = { isWorking: false,
									titles: []
								}, action) => {
	switch(action.type) {
		case postActs.LOAD_POST_TITLES_REQ:
			return Object.assign({}, state, {
				isFetching: true,
				titles: [],
			});
			
		case postActs.LOAD_POST_TITLES_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				titles: action.response.posts,
			});
			
		case postActs.LOAD_POST_TITLES_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
				titles: [],
			});
			
			
		default:
			return state;
	}
};



export const postBody = (state = { 	isWorking: false,
									isEditable: false,
									currentPost: { id: null,
													title: '',
													content: '',
													authorid: null,
													author: '',
													isLocked: false,
													isPublic: true,
												},
								}, action) => {
	switch(action.type) {
		case postActs.LOAD_POST_BODY_REQ:
			return Object.assign({}, state, {
				isWorking: true,
				isEditable: false,
			});
		
		case postActs.LOAD_POST_BODY_NEW:
			return Object.assign({}, state, {
				isWorking: false,
				isEditable: true,
				currentPost: { id: null,
								title: 'New Post',
								content: '',
								authorid: null,
								author: '',
								isLocked: false,
								isPublic: true,
							},
			});
			
		case postActs.LOAD_POST_BODY_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				isEditable: false,
				currentPost: { id: action.response.post.id,
								title: action.response.post.title || '[No title]',
								content: action.response.post.content || '',
								authorid: action.response.post.authorid || null,
								author: action.response.post.author || '[No author]',
								isLocked: action.response.post.isLocked || false,
								isPublic: action.response.post.isPublic || false,
							},
			});
			
		case postActs.LOAD_POST_BODY_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
				isEditable: false,
			});
			
		
		
		///---
		case postActs.ENABLE_POST_EDITABLE:
			return Object.assign({}, state, {
				isEditable: true,
			});
		
		case postActs.DISABLE_POST_EDITABLE:
			return Object.assign({}, state, {
				isEditable: false,
			});
		
		
		
		///---
		case postActs.SAVE_POST_REQ:
			return Object.assign({}, state, {
				isWorking: true,
			});
			
		case postActs.SAVE_POST_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				isEditable: false,
				currentPost: { id: action.response.newid,
								title: '',
								content: '',
								author: '',
								isLocked: false,
								isPublic: false,
							},
			});
			
		case postActs.SAVE_POST_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
			});
		
		
		
		///---
		case postActs.DELETE_POST_VERIFY:
			return Object.assign({}, state, {
				showDeleteVerify: true,
			});
		
		case postActs.DELETE_POST_ABORT:
			return Object.assign({}, state, {
				showDeleteVerify: false,
				isWorking: false,
			});
			
		case postActs.DELETE_POST_REQ:
			return Object.assign({}, state, {
				showDeleteVerify: false,
				isWorking: true,
			});
			
		case postActs.DELETE_POST_SUCC:
			return Object.assign({}, state, {
				showDeleteVerify: false,
				isWorking: false,
			});
			
		case postActs.DELETE_POST_FAIL:
			return Object.assign({}, state, {
				showDeleteVerify: false,
				isWorking: false,
			});
			
		
		default:
			return state;
	}
};
