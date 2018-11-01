import {	REQUEST_USER_TOKEN, REQUEST_USER_TOKEN_SUCC, REQUEST_USER_TOKEN_FAIL,
		DESTROY_USER_TOKEN,
		SHOW_LOGIN_PANEL, HIDE_LOGIN_PANEL, SHOW_RESPONSE, HIDE_RESPONSE,
		 } from '../actions/accounts';
	
		
		
		
export const accounts = (state = { isFetching: false, isAuthed: false, }, action) => {
	switch(action.type) {
		case REQUEST_USER_TOKEN:
			return Object.assign({}, state, {
				isFetching: true,
			});
			
		case REQUEST_USER_TOKEN_SUCC:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthed: true,
				
				token: action.response.token,
				userid: action.response.userid,
				username: action.response.username,
			});
		
		case REQUEST_USER_TOKEN_FAIL:
			return Object.assign({}, state, {
				isFetching: false,
			});
			
		
		case DESTROY_USER_TOKEN:
			return Object.assign({}, state, {
				isAuthed: false,
				
				token: null,
				userid: null,
				username: null,
			});
			
			
		case SHOW_LOGIN_PANEL:
			return Object.assign({}, state, {
				showLogin: true,
			});
			
		case HIDE_LOGIN_PANEL:
			return Object.assign({}, state, {
				showLogin: false,
			});
		
		case SHOW_RESPONSE:
			return Object.assign({}, state, {
				showResponse: true,
				//response: action.response.result,
			});
		
		case HIDE_RESPONSE:
			return Object.assign({}, state, {
				showResponse: false,
			});
		
		default:
			return state;
	}
}
