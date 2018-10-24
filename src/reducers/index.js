import { combineReducers } from 'redux'
import { titles, body, loader } from './pages'


export default combineReducers({
	titles,
	body,
	loader
});
