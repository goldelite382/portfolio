import { INITIALISE_SESSION } from '../../action_head'
import * as acctActs from '../actions/accounts';


export const accounts = (state = { isWorking: false,
									isAuthed: false,
									token: null,
									username: null,
									userid: null,
								}, action) => {
	switch(action.type) {
		case acctActs.NEW_USER_TOKEN_REQ:
		case acctActs.CHECK_USER_TOKEN_REQ:
		case acctActs.REFRESH_USER_TOKEN_REQ:
		case acctActs.DESTROY_USER_TOKEN_REQ:
		case acctActs.CREATE_USER_REQ:
			return Object.assign({}, state, {
				isWorking: true,
			});
			
			
		///---
		case acctActs.NEW_USER_TOKEN_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				isAuthed: true,
				
				token: action.response.token,
				userid: action.response.userid,
				username: action.response.username,
			});
		
		case acctActs.NEW_USER_TOKEN_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
				isAuthed: false,
				
				token: null,
				userid: null,
				username: null,
			});
			
		
		///---
		case acctActs.CHECK_USER_TOKEN_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				isAuthed: true,
				
				token: action.response.token,
				userid: action.response.userid,
				username: action.response.username,
			});
		
		case acctActs.CHECK_USER_TOKEN_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
				isAuthed: false,
				
				token: null,
				userid: null,
				username: null,
			});
		
		
		///---
		case acctActs.DESTROY_USER_TOKEN_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				isAuthed: false,
				
				token: null,
				userid: null,
				username: null,
			});
		
		case acctActs.DESTROY_USER_TOKEN_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
			});
			
			
		
		///---
		case acctActs.CREATE_USER_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				showRegister: false,
			});
		
		case acctActs.CREATE_USER_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
			});
		
		
		
		
		///---
		case acctActs.SHOW_LOGIN_PANEL:
			return Object.assign({}, state, {
				showLogin: true,
			});
			
		case acctActs.HIDE_LOGIN_PANEL:
			return Object.assign({}, state, {
				showLogin: false,
			});
		
		case acctActs.SHOW_REGISTER_PANEL:
			return Object.assign({}, state, {
				showRegister: true,
			});
			
		case acctActs.HIDE_REGISTER_PANEL:
			return Object.assign({}, state, {
				showRegister: false,
			});
		
		case acctActs.SHOW_RESPONSE:
			return Object.assign({}, state, {
				showResponse: true,
				//response: action.response.result,
			});
		
		case acctActs.HIDE_RESPONSE:
			return Object.assign({}, state, {
				showResponse: false,
			});
		
		default:
			return state;
	}
}
