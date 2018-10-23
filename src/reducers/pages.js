import { SHOW_CONTENT, LIST_CONTENT, ADD_CONTENT, READ_CONTENT, HIDE_CONTENT,
		 FETCH_TABS_REQUEST, FETCH_TABS_SUCCESS, FETCH_TABS_FAILURE, RECEIVE_TABS } from '../actions';
		
		
const pages = (state = { isFetching: false, didInvalidate: false, tabs: [] }, action) => {
	switch(action.type) {
		case FETCH_TABS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
			});
		case RECEIVE_TABS:
			return Object.assign({}, state, {
				isFetching: false,
				tabs: action.json.tabs,
			});
			
			
		case SHOW_CONTENT:
			console.log("Showing content...");
			return state;
		case ADD_CONTENT:
			console.log("Adding content...");
			return [ ...state, { title: action.title, content: action.content } ];
		default:
			return state;
	}
};

export default pages;
