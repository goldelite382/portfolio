import {	REQUEST_POST_TITLES, REQUEST_POST_TITLES_SUCC, REQUEST_POST_TITLES_FAIL, REQUEST_NEW_POST_BODY,
		REQUEST_POST_BODY, REQUEST_POST_BODY_SUCC, REQUEST_POST_BODY_FAIL,
		ENABLE_EDIT_POST, DISABLE_EDIT_POST, SAVE_POST, SAVE_POST_SUCC, SAVE_POST_FAIL,
		REQUEST_DELETE_POST, CANCEL_DELETE_POST, DELETE_POST, DELETE_POST_SUCC, DELETE_POST_FAIL,
		 } from '../actions';
	
		
		
		
export const titles = (state = { isFetching: false, titles: [] }, action) => {
	switch(action.type) {
		case REQUEST_POST_TITLES:
			return Object.assign({}, state, {
				isFetching: true,
				titles: [],
			});
			
		case REQUEST_POST_TITLES_SUCC:
			return Object.assign({}, state, {
				isFetching: false,
				titles: action.response.result
			});
			
		case REQUEST_POST_TITLES_FAIL:
			return Object.assign({}, state, {
				isFetching: false,
			});
			
			
		default:
			return state;
	}
};



export const body = (state = { curid: undefined, title: '', content: '',
								isFetching: false, isSaving: false, editMode: false,
							}, action) => {
	switch(action.type) {
		case REQUEST_POST_BODY:
			return Object.assign({}, state, {
				isFetching: true,
				content: '',
			});
		
		case REQUEST_NEW_POST_BODY:
			return Object.assign({}, state, {
				isFetching: false,
				curid: undefined,
				title: 'New Post',
				isLocked: false,
				content: '',
			});
			
		case REQUEST_POST_BODY_SUCC:
			return Object.assign({}, state, {
				isFetching: false,
				curid: action.response.result.id,
				title: action.response.result.title || 'Undefined title',
				content: action.response.result.content || 'Undefined content',
				isLocked: action.response.result.locked || false,
			});
			
		case REQUEST_POST_BODY_FAIL:
			return Object.assign({}, state, {
				isFetching: false,
				isLocked: false,
				content: '',
			});
			
		
		
		case ENABLE_EDIT_POST:
			return Object.assign({}, state, {
				editMode: true,
			});
		
		case DISABLE_EDIT_POST:
			return Object.assign({}, state, {
				editMode: false,
			});
		
		
		
		case SAVE_POST:
			return Object.assign({}, state, {
				isSaving: true,
			});
			
		case SAVE_POST_SUCC:
			return Object.assign({}, state, {
				isSaving: false,
				curid: action.response.result.id,
				editMode: false,
			});
			
		case SAVE_POST_FAIL:
			return Object.assign({}, state, {
				isSaving: false,
			});
		
		case REQUEST_DELETE_POST:
			return Object.assign({}, state, {
				requestingDeletion: true,
			});
		
		case CANCEL_DELETE_POST:
			return Object.assign({}, state, {
				requestingDeletion: false,
			});
			
		case DELETE_POST:
			return Object.assign({}, state, {
				requestingDeletion: false,
				isDeleting: true,
			});
			
		case DELETE_POST_SUCC:
			return Object.assign({}, state, {
				requestingDeletion: false,
				isDeleting: false,
			});
			
		case DELETE_POST_FAIL:
			return Object.assign({}, state, {
				isDeleting: false,
			});
			
		
		default:
			return state;
	}
};
