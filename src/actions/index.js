import fetch from 'cross-fetch'

//const REST_SERVER = "http://simple-route-nodeportfolio.193b.starter-ca-central-1.openshiftapps.com:8080/"; //process.env.rest_server || 'http://127.0.0.1:8088/';
const REST_SERVER = "http://voidfill.openode.io/";

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
		
		return fetch(REST_SERVER + 'post')
			.then(	response => response.json(),
					error => dispatch(requestPostTitlesFail(error)) )
			.then(	response => dispatch(requestPostTitlesSucc(response)) );	// response is in json
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
		
		console.log("Fetching post for ID " + postid);
		return fetch(REST_SERVER + 'post/' + postid)
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


// Create or update a post
export function commitPostData(postid, title, content) {
	return function(dispatch) {
		if(postid == undefined)
			return fetch(REST_SERVER + 'post/', { method: 'POST',
													headers: { "content-type": "application/json", },
													body: JSON.stringify({ title: title, content: content }) })
				.then(	response => response.json(),
						error => dispatch(savePostFail(error)))
				.then(json => dispatch(savePostSucc(json)))
				.then(json => ( dispatch(fetchPostBody(json.response.result.id)), dispatch(fetchPostTitles()) ));
		else
			return fetch(REST_SERVER + 'post/', { method: 'PUT',
													headers: { "content-type": "application/json", },
													body: JSON.stringify({ id: postid, title: title, content: content }) })
				.then(	response => response.json(),
						error => dispatch(savePostFail(error)))
				.then(json => dispatch(savePostSucc({ result: { id: postid } })))
				.then(json => ( dispatch(fetchPostBody(postid)), dispatch(fetchPostTitles()) ));
		
	};
}


export const CHALLENGE_DELETE_POST = 'CHALLENGE_DELETE_POST'
export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
export const CANCEL_DELETE_POST = 'CANCEL_DELETE_POST'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_SUCC = 'DELETE_POST_SUCC'
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL'

export const requestDeletePost = makeActionCreator(REQUEST_DELETE_POST);
export const cancelDeletePost = makeActionCreator(CANCEL_DELETE_POST);
export const deletePost = makeActionCreator(DELETE_POST);
export const deletePostSucc = makeActionCreator(DELETE_POST_SUCC);
export const deletePostFail = makeActionCreator(DELETE_POST_FAIL);

export function deletePostData(postid) {
	return function(dispatch) {
		return fetch(REST_SERVER + 'post/' + postid, { method: 'DELETE' })
			.then(	response => response.json(),
					error => dispatch(deletePostFail(error)))
			.then(json => dispatch(deletePostSucc(json)));
	};
}

