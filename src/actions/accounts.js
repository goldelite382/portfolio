import { REST_SERVER, makeActionCreator, dispatchMessagedFailure } from './index.js'

//import cookie from 'react-cookies';
import axios from 'axios'

function saveCookies(response) {
	return function(dispatch) {
		console.log("Setting userid: " + response.userid);
		console.log("Setting token: " + response.token);
		//cookie.save('userid', response.userid, { path: '/' });
		//cookie.save('token', response.token, { path: '/' });
		
		dispatch(requestUserTokenSucc(response));
	};
}


/* Post Title actions*/
export const REQUEST_USER_TOKEN = 'REQUEST_USER_TOKEN'
export const REQUEST_USER_TOKEN_SUCC = 'REQUEST_USER_TOKEN_SUCC'
export const REQUEST_USER_TOKEN_FAIL = 'REQUEST_USER_TOKEN_FAIL'
export const DESTROY_USER_TOKEN = 'DESTROY_USER_TOKEN'

export const requestUserToken = makeActionCreator(REQUEST_USER_TOKEN);
export const requestUserTokenSucc = makeActionCreator(REQUEST_USER_TOKEN_SUCC, 'response');
export const requestUserTokenFail = makeActionCreator(REQUEST_USER_TOKEN_FAIL, 'error');
export const destroyUserToken = makeActionCreator(DESTROY_USER_TOKEN);


export function fetchUserToken(username, password) {
	return function(dispatch) {
		dispatch(requestUserToken());
		
		console.log("Fetching for " + username + " / " + password);
		//return fetch(REST_SERVER + 'auth/', { method: 'POST',
		//									credentials: 'include',
		//									headers: { "content-type": "application/json", },
		//									body: JSON.stringify({ username: username,
		//														password: password }) })
		return axios.post(REST_SERVER + 'auth/', { username: username, password: password })
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(requestUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(saveCookies(response)) :
																dispatch(dispatchMessagedFailure(requestUserTokenFail, response)) );	// response is in json
	};
}


export function validateUserToken(userid, token) {
	return function(dispatch) {
		dispatch(requestUserToken());
		
		//return fetch(REST_SERVER + 'auth/' + userid + '/' + token)
		return axios.get(REST_SERVER + 'auth/' + userid + '/' + token)
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(requestUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(saveCookies(response)) :
																dispatch(dispatchMessagedFailure(requestUserTokenFail, response)) );
	};
}

export function deauthUserToken(userid, token) {
	return function(dispatch) {
		dispatch(requestUserToken());
		
		//return fetch(REST_SERVER + 'auth/' + userid + '/' + token, { method: 'DELETE' })
		return axios.delete(REST_SERVER + 'auth/' + userid + '/' + token)
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(requestUserTokenFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(destroyUserToken(response)) :
																dispatch(dispatchMessagedFailure(requestUserTokenFail, response)) );
	};
}




export const SHOW_LOGIN_PANEL = 'SHOW_LOGIN_PANEL'
export const HIDE_LOGIN_PANEL = 'HIDE_LONGIN_PANEL'
export const SHOW_RESPONSE = 'SHOW_RESPONSE'
export const HIDE_RESPONSE = 'HIDE_RESPONSE'

export const showLoginPanel = makeActionCreator(SHOW_LOGIN_PANEL);
export const hideLoginPanel = makeActionCreator(HIDE_LOGIN_PANEL);
export const showResponse = makeActionCreator(SHOW_RESPONSE, 'response');
export const hideResponse = makeActionCreator(HIDE_RESPONSE);
