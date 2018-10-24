import {	REQUEST_POST_TITLES, REQUEST_POST_TITLES_SUCC, REQUEST_POST_TITLES_FAIL,
		REQUEST_POST_BODY, REQUEST_POST_BODY_SUCC, REQUEST_POST_BODY_FAIL,
		CYCLE_LOADER_DOTS } from '../actions';
		
		
		
		
		
export const titles = (state = { isFetching: false, titles: [] }, action) => {
	switch(action.type) {
		case REQUEST_POST_TITLES:
			return Object.assign({}, state, {
				isFetching: true,
				titles: [],
			});
			
		case REQUEST_POST_TITLES_SUCC:
			return Object.assign({}, state, {
				isFetching: false,
				titles: action.response.result
			});
			
		case REQUEST_POST_TITLES_FAIL:
			return Object.assign({}, state, {
				isFetching: false,
			});
			
			
		default:
			return state;
	}
};



export const body = (state = { isFetching: false, content: '' }, action) => {
	switch(action.type) {
		case REQUEST_POST_BODY:
			return Object.assign({}, state, {
				isFetching: true,
				content: '',
			});
			
		case REQUEST_POST_BODY_SUCC:
			return Object.assign({}, state, {
				isFetching: false,
				content: action.response.result.content || '',
			});
			
		case REQUEST_POST_BODY_FAIL:
			return Object.assign({}, state, {
				isFetching: false,
				content: '',
			});
		
		
		default:
			return state;
	}
};

export const loader = (state = { dotcount: 1 }, action) => {
	switch(action.type) {
		case CYCLE_LOADER_DOTS:
			return Object.assign({}, state, {
				dotcount : (state.dotcount >= 3 ? 0 : state.dotcount + 1)
			});
		
		default:
			return state;
	}
};
