import fetch from 'cross-fetch'

const REST_SERVER = 'http://127.0.0.1:8088/';

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}




/* Post Title actions*/
export const REQUEST_POST_TITLES = 'REQUEST_POST_TITLES'
export const REQUEST_POST_TITLES_SUCC = 'REQUEST_POST_TITLES_SUCC'
export const REQUEST_POST_TITLES_FAIL = 'REQUEST_POST_TITLES_FAIL'


export const requestPostTitles = makeActionCreator(REQUEST_POST_TITLES);
export const requestPostTitlesSucc = makeActionCreator(REQUEST_POST_TITLES_SUCC, 'response');
export const requestPostTitlesFail = makeActionCreator(REQUEST_POST_TITLES_FAIL, 'error');


export function fetchPostTitles() {
	return function(dispatch) {
		dispatch(requestPostTitles());
		
		return fetch(REST_SERVER + 'content')
			.then(	response => response.json(),
					error => dispatch(requestPostTitlesFail(error)))
			.then(json => dispatch(requestPostTitlesSucc(json)));
	};
}




/* Post content actions */
export const REQUEST_POST_BODY = 'REQUEST_POST_BODY'
export const REQUEST_POST_BODY_SUCC = 'REQUEST_POST_BODY_SUCC'
export const REQUEST_POST_BODY_FAIL = 'REQUEST_POST_BODY_FAIL'


export const requestPostBody = makeActionCreator(REQUEST_POST_BODY);
export const requestPostBodySucc = makeActionCreator(REQUEST_POST_BODY_SUCC, 'response');
export const requestPostBodyFail = makeActionCreator(REQUEST_POST_BODY_FAIL, 'error');


export function fetchPostBody(postid) {
	return function(dispatch) {
		dispatch(requestPostBody());
		
		return fetch(REST_SERVER + 'content/' + postid)
			.then(	response => response.json(),
					error => dispatch(requestPostBodyFail(error)))
			.then(json => dispatch(requestPostBodySucc(json)));
	};
}




/* Misc actions */
export const CYCLE_LOADER_DOTS = 'CYCLE_LOADER_DOTS';
export const cycleLoaderDots = makeActionCreator(CYCLE_LOADER_DOTS);
