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
export const REQUEST_NEW_POST_BODY = 'REQUEST_NEW_POST_BODY'

export const requestPostBody = makeActionCreator(REQUEST_POST_BODY);
export const requestPostBodySucc = makeActionCreator(REQUEST_POST_BODY_SUCC, 'response');
export const requestPostBodyFail = makeActionCreator(REQUEST_POST_BODY_FAIL, 'error');
export const requestNewPostBody = makeActionCreator(REQUEST_NEW_POST_BODY);


export function fetchPostBody(postid) {
	return function(dispatch) {
		dispatch(requestPostBody());
		
		return fetch(REST_SERVER + 'content/' + postid)
			.then(	response => response.json(),
					error => dispatch(requestPostBodyFail(error)))
			.then(json => dispatch(requestPostBodySucc(json)));
	};
}


export const ENABLE_EDIT_POST = 'ENABLE_EDIT_POST'
export const DISABLE_EDIT_POST = 'DISABLE_EDIT_POST'
export const SAVE_POST = 'SAVE_POST'
export const SAVE_POST_SUCC = 'SAVE_POST_SUCC'
export const SAVE_POST_FAIL = 'SAVE_POST_FAIL'

export const enableEditPost = makeActionCreator(ENABLE_EDIT_POST);
export const disableEditPost = makeActionCreator(DISABLE_EDIT_POST);
export const savePost = makeActionCreator(SAVE_POST);
export const savePostSucc = makeActionCreator(SAVE_POST_SUCC, 'response');
export const savePostFail = makeActionCreator(SAVE_POST_FAIL, 'error');

export function commitPostData(postid, title, content) {
	return function(dispatch) {
		if(postid == undefined)
			return fetch(REST_SERVER + 'content/' + title + '/' + content, { method: 'POST' })
				.then(	response => response.json(),
						error => dispatch(savePostFail(error)))
				.then(json => dispatch(savePostSucc(json)))
				.then(json => ( dispatch(fetchPostBody(json.result.id)), dispatch(fetchPostTitles()) ));
		else
			return fetch(REST_SERVER + 'content/' + postid + '/' + title + '/' + content, { method: 'PUT' })
				.then(	response => response.json(),
						error => dispatch(savePostFail(error)))
				.then(json => dispatch(savePostSucc({ result: { id: postid } })))
				.then(json => ( dispatch(fetchPostBody(postid)), dispatch(fetchPostTitles()) ));
		
	};
}



/* Misc actions */
export const CYCLE_UPDATER_DOTS = 'CYCLE_UPDATER_DOTS';
export const cycleUpdaterDots = makeActionCreator(CYCLE_UPDATER_DOTS);

