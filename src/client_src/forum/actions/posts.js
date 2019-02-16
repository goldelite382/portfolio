import { REST_SERVER, makeActionCreator, mAC, dispatchMessagedFailure } from '../../action_head'

import axios from 'axios'
axios.defaults.withCredentials = true  // make axios send cookies by default

/* Post Title actions*/
export const LOAD_POST_TITLES_REQ = 'LOAD_POST_TITLES_REQ'
export const LOAD_POST_TITLES_SUCC = 'LOAD_POST_TITLES_SUCC'
export const LOAD_POST_TITLES_FAIL = 'LOAD_POST_TITLES_FAIL'

export const loadPostTitlesReq  = mAC(LOAD_POST_TITLES_REQ);
export const loadPostTitlesSucc = mAC(LOAD_POST_TITLES_SUCC, 'response');
export const loadPostTitlesFail = mAC(LOAD_POST_TITLES_FAIL, 'error');


export function loadPostTitles() {
	return function(dispatch) {
		dispatch(loadPostTitlesReq());
		
		return axios.get(REST_SERVER + 'post')
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(loadPostTitlesFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(loadPostTitlesSucc(response)) :
																dispatch(dispatchMessagedFailure(loadPostTitlesFail, response)) );
	};
}




/* Post content actions */
export const LOAD_POST_BODY_NEW = 'LOAD_POST_BODY_NEW'
export const LOAD_POST_BODY_REQ = 'LOAD_POST_BODY_REQ'
export const LOAD_POST_BODY_SUCC = 'LOAD_POST_BODY_SUCC'
export const LOAD_POST_BODY_FAIL = 'LOAD_POST_BODY_FAIL'

export const loadPostBodyNew  = mAC(LOAD_POST_BODY_NEW);
export const loadPostBodyReq  = mAC(LOAD_POST_BODY_REQ);
export const loadPostBodySucc = mAC(LOAD_POST_BODY_SUCC, 'response');
export const loadPostBodyFail = mAC(LOAD_POST_BODY_FAIL, 'error');


export function loadPostBody(postid) {
	return function(dispatch) {
		dispatch(loadPostBodyReq());
		
		return axios.get(REST_SERVER + 'post/' + postid)
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(loadPostBodyFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(loadPostBodySucc(response)) :
																dispatch(dispatchMessagedFailure(loadPostBodyFail, response)) );
	};
}




export const ENABLE_POST_EDITABLE = 'ENABLE_POST_EDITABLE'
export const DISABLE_POST_EDITABLE = 'DISABLE_POST_EDITABLE'

export const enablePostEditable  = mAC(ENABLE_POST_EDITABLE);
export const disablePostEditable = mAC(DISABLE_POST_EDITABLE);


export const SAVE_POST_REQ = 'SAVE_POST_REQ'
export const SAVE_POST_SUCC = 'SAVE_POST_SUCC'
export const SAVE_POST_FAIL = 'SAVE_POST_FAIL'

export const savePostReq  = mAC(SAVE_POST_REQ);
export const savePostSucc = mAC(SAVE_POST_SUCC, 'response');
export const savePostFail = mAC(SAVE_POST_FAIL, 'error');


// Create or update a post
export function savePost(postid, title, content, isLocked, isPublic) {
	return function(dispatch) {
		dispatch(savePostReq());
		
		if(postid == undefined)
			return axios.post(REST_SERVER + 'post/', { title: title, content: content, isLocked: isLocked, isPublic: isPublic })
				.then(	response => response.data,
						error => dispatch(dispatchMessagedFailure(savePostFail, error)) )
				.then(	response => response.result === 'success' ?	dispatch(savePostSucc(response)) :
																	dispatch(dispatchMessagedFailure(savePostFail, response)) )
				.then(	response => ( dispatch(loadPostBody(response.response.newid)), dispatch(loadPostTitles()) ));
		else
			return axios.put(REST_SERVER + 'post/', { id: postid, title: title, content: content, isLocked: isLocked, isPublic: isPublic })
				.then(	response => response.data,
						error => dispatch(dispatchMessagedFailure(savePostFail, error)) )
				.then(	response => response.result === 'success' ?	dispatch(savePostSucc({ newid: postid })) :
																	dispatch(dispatchMessagedFailure(savePostFail, response)) )
				.then(	respone => ( dispatch(loadPostBody(postid)), dispatch(loadPostTitles()) ));
		
	};
}





export const DELETE_POST_VERIFY = 'VERIFY_DELETE_POST'
export const DELETE_POST_ABORT = 'ABORT_DELETE_POST'

export const deletePostVerify = mAC(DELETE_POST_VERIFY);
export const deletePostAbort = mAC(DELETE_POST_ABORT);


export const DELETE_POST_REQ = 'DELETE_POST_REQ'
export const DELETE_POST_SUCC = 'DELETE_POST_SUCC'
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL'

export const deletePostReq  = mAC(DELETE_POST_REQ);
export const deletePostSucc = mAC(DELETE_POST_SUCC);
export const deletePostFail = mAC(DELETE_POST_FAIL);

export function deletePost(postid) {
	return function(dispatch) {
		dispatch(deletePostReq());
		
		return axios.delete(REST_SERVER + 'post/' + postid)
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(deletePostFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(deletePostSucc(response)) :
																dispatch(dispatchMessagedFailure(deletePostFail, response)) );
	};
}

