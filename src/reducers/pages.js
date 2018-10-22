import { combineReducers } from 'redux';
import { SHOW_CONTENT, LIST_CONTENT, ADD_CONTENT, READ_CONTENT, HIDE_CONTENT } from '../actions';
		
		
const pages = (state = [], action) => {
	switch(action.type) {
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
