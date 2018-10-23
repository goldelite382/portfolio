import fetch from 'cross-fetch'

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export const LIST_CONTENT = 'LIST_CONTENT';
export const SHOW_CONTENT = 'SHOW_CONTENT';
export const ADD_CONTENT = 'ADD_CONTENT';
export const READ_CONTENT = 'READ_CONTENT';
export const HIDE_CONTENT = 'HIDE_CONTENT';

export const listContent = makeActionCreator(LIST_CONTENT);
export const showContent = makeActionCreator(SHOW_CONTENT, 'id');
export const readContent = makeActionCreator(READ_CONTENT, 'id');
export const hideContent = makeActionCreator(HIDE_CONTENT, 'id');
export const addContent  = makeActionCreator(ADD_CONTENT, 'name', 'title', 'content');


export const FETCH_TABS_REQUEST = 'FETCH_TABS_REQUEST';
export const FETCH_TABS_SUCCESS = 'FETCH_TABS_SUCCESS';
export const FETCH_TABS_FAILURE = 'FETCH_TABS_FAILURE';
export const RECEIVE_TABS = 'RECEIVE_TABS';

export const fetchTabsRequest = makeActionCreator(FETCH_TABS_REQUEST);
export const fetchTabsSuccess = makeActionCreator(FETCH_TABS_SUCCESS, 'response');
export const fetchTabsFailure = makeActionCreator(FETCH_TABS_FAILURE, 'failure');
export const receiveTabs = makeActionCreator(RECEIVE_TABS, 'json');




export function fetchTabs() {
	return function (dispatch) {
		dispatch(fetchTabsRequest());
		
		return fetch('http://127.0.0.1:8088/tabs/')
			.then(response => response.json(),
				  failure => console.log("An error occurred: " + failure)
				 )
			.then(json => dispatch(receiveTabs(json))
				);
	};
};
