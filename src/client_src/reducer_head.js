import { combineReducers } from 'redux'

import { SHOW_MESSAGE, DISMISS_MESSAGE } from './action_head'


import { postTitles, postBody } from './forum/reducers/posts'
import { accounts } from './forum/reducers/accounts'
import { scores, gamestate } from './game/reducers/scores'



export const misc = (state = { messages: [], activemessage: '' }, action) => {
	switch(action.type) {
		case SHOW_MESSAGE:
			let new_messages = state.messages;
			if(action.message) new_messages.push(action.message);
			
			return Object.assign({}, state, {
				messages: new_messages,
				activemessage: new_messages[0],
			});
		
		case DISMISS_MESSAGE:
			let reduced_messages = state.messages;
			if(reduced_messages.length) {
				reduced_messages.shift();
			}
			
			return Object.assign({}, state, {
				messages: reduced_messages,
				activemessage: reduced_messages[0],
			});
		
		default:
			return state;
	}
}



export default combineReducers({
	misc,
	
	postTitles,
	postBody,
	accounts,
	
	scores,
	gamestate,
});
