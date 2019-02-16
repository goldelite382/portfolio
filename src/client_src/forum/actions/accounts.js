import { REST_SERVER, makeActionCreator, mAC, dispatchMessagedFailure, showMessage } from '../../action_head'

import axios from 'axios'
axios.defaults.withCredentials = true  // make axios send cookies by default

export const NEW_USER_TOKEN_REQ = 'NEW_USER_TOKEN_REQ'
export const NEW_USER_TOKEN_SUCC = 'NEW_USER_TOKEN_SUCC'
export const NEW_USER_TOKEN_FAIL = 'NEW_USER_TOKEN_FAIL'

export const CHECK_USER_TOKEN_REQ = 'CHECK_USER_TOKEN_REQ'
export const CHECK_USER_TOKEN_SUCC = 'CHECK_USER_TOKEN_SUCC'
export const CHECK_USER_TOKEN_FAIL = 'CHECK_USER_TOKEN_FAIL'

export const REFRESH_USER_TOKEN_REQ = 'REFRESH_USER_TOKEN_REQ'
export const REFRESH_USER_TOKEN_SUCC = 'REFRESH_USER_TOKEN_SUCC'
export const REFRESH_USER_TOKEN_FAIL = 'REFRESH_USER_TOKEN_FAIL'

export const DESTROY_USER_TOKEN_REQ = 'DESTROY_USER_TOKEN_REQ'
export const DESTROY_USER_TOKEN_SUCC = 'DESTROY_USER_TOKEN_SUCC'
export const DESTROY_USER_TOKEN_FAIL = 'DESTROY_USER_TOKEN_FAIL'



export const newUserTokenReq  = mAC(NEW_USER_TOKEN_REQ);
export const newUserTokenSucc = mAC(NEW_USER_TOKEN_SUCC, 'response');
export const newUserTokenFail = mAC(NEW_USER_TOKEN_FAIL, 'error');

export const checkUserTokenReq  = mAC(CHECK_USER_TOKEN_REQ);
export const checkUserTokenSucc = mAC(CHECK_USER_TOKEN_SUCC, 'response');
export const checkUserTokenFail = mAC(CHECK_USER_TOKEN_FAIL, 'error');

export const refreshUserTokenReq  = mAC(REFRESH_USER_TOKEN_REQ);
export const refreshUserTokenSucc = mAC(REFRESH_USER_TOKEN_SUCC, 'response');
export const refreshUserTokenFail = mAC(REFRESH_USER_TOKEN_FAIL, 'error');

export const destroyUserTokenReq  = mAC(DESTROY_USER_TOKEN_REQ);
export const destroyUserTokenSucc = mAC(DESTROY_USER_TOKEN_SUCC, 'response');
export const destroyUserTokenFail = mAC(DESTROY_USER_TOKEN_FAIL, 'error');



export function newUserToken(username, password) {
	return function(dispatch) {
		dispatch(newUserTokenReq());
		
		return axios.post(REST_SERVER + 'auth/', { username: username, password: password })
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(newUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(newUserTokenSucc(response)) :
																dispatch(dispatchMessagedFailure(newUserTokenFail, response)) );	// response is in json
	};
}


export function checkUserToken() {
	return function(dispatch) {
		dispatch(checkUserTokenReq());
		
		return axios.get(REST_SERVER + 'auth/check')
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(checkUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(checkUserTokenSucc(response)) :
																dispatch(checkUserTokenFail, response) );	// Don't message this failure, we're only validating
	};
}


export function refreshUserToken() {
	return function(dispatch) {
		dispatch(refreshUserTokenReq());
		
		return axios.post(REST_SERVER + 'auth/update')
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(refreshUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(refreshUserTokenSucc(response)) :
																dispatch(refreshUserTokenFail, response) );	// Don't message this failure, we're only validating
	};
}


export function destroyUserToken() {
	return function(dispatch) {
		dispatch(destroyUserTokenReq());
		
		return axios.delete(REST_SERVER + 'auth/')
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(destroyUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(destroyUserTokenSucc(response)) :
																dispatch(dispatchMessagedFailure(destroyUserTokenFail, response)) );
	};
}



export const CREATE_USER_REQ  = 'CREATE_USER_REQ'
export const CREATE_USER_SUCC = 'CREATE_USER_SUCC'
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL'
export const createUserReq = mAC(CREATE_USER_REQ)
export const createUserSucc = mAC(CREATE_USER_SUCC)
export const createUserFail = mAC(CREATE_USER_FAIL)

export function createUser(email, username, password) {
	return function(dispatch) {
		dispatch(createUserReq());
		
		return axios.post(REST_SERVER + 'user/', { email: email, username: username, password: password })
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(createUserFail, error)) )
			.then(	response => {
				if(response.result === 'success') {
					dispatch(createUserSucc(response));
					dispatch(showMessage("User account successfully created. Please log in"));
				} else {
					dispatch(dispatchMessagedFailure(createUserFail, response))
				}
			});
	}
}




export const SHOW_LOGIN_PANEL = 'SHOW_LOGIN_PANEL'
export const HIDE_LOGIN_PANEL = 'HIDE_LOGIN_PANEL'
export const SHOW_REGISTER_PANEL = 'SHOW_REGISTER_PANEL'
export const HIDE_REGISTER_PANEL = 'HIDE_REGISTER_PANEL'


export const SHOW_RESPONSE = 'SHOW_RESPONSE'
export const HIDE_RESPONSE = 'HIDE_RESPONSE'


export const showLoginPanel = makeActionCreator(SHOW_LOGIN_PANEL);
export const hideLoginPanel = makeActionCreator(HIDE_LOGIN_PANEL);
export const showRegisterPanel = makeActionCreator(SHOW_REGISTER_PANEL);
export const hideRegisterPanel = makeActionCreator(HIDE_REGISTER_PANEL);

export const showResponse = makeActionCreator(SHOW_RESPONSE, 'response');
export const hideResponse = makeActionCreator(HIDE_RESPONSE);
