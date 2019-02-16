import { REST_SERVER, makeActionCreator, mAC, dispatchMessagedFailure } from '../../action_head'

import axios from 'axios'
axios.defaults.withCredentials = true  // make axios send cookies by default

export const RESET = 'RESET'
export const resetGame = mAC(RESET);


/* Post Title actions*/
export const LOAD_SCORES_REQ = 'LOAD_SCORES_REQ'
export const LOAD_SCORES_SUCC = 'LOAD_SCORES_SUCC'
export const LOAD_SCORES_FAIL = 'LOAD_SCORES_FAIL'

export const loadScoresReq  = mAC(LOAD_SCORES_REQ);
export const loadScoresSucc = mAC(LOAD_SCORES_SUCC, 'response');
export const loadScoresFail = mAC(LOAD_SCORES_FAIL, 'error');


export function loadScores() {
	return function(dispatch) {
		dispatch(loadScoresReq());
		
		return axios.get(REST_SERVER + 'scores')
			.then(	response => response.data,
					error => dispatch(dispatchMessagedFailure(loadScoresFail, error)) )
			.then(	response => response.result === 'success' ?	dispatch(loadScoresSucc(response)) :
																dispatch(dispatchMessagedFailure(loadScoresFail, response)) );
	};
}


export const INCREASE_SCORE = 'INCREASE_SCORE'
export const DECREASE_SCORE = 'DECREASE_SCORE'

export const increaseScore = mAC(INCREASE_SCORE, 'amount');
export const decreaseScore = mAC(DECREASE_SCORE, 'amount');









export const INCREASE_LIVES = 'INCREASE_LIVES'
export const DECREASE_LIVES = 'DECREASE_LIVES'

export const increaseLives = mAC(INCREASE_LIVES, 'amount');
export const decreaseLives = mAC(DECREASE_LIVES, 'amount');



export const INCREASE_FOODBOWL = 'INCREASE_FOODBOWL'
export const DECREASE_FOODBOWL = 'DECREASE_FOODBOWL'
export const INCREASE_FOOD_LIMIT = 'INCREASE_FOOD_LIMIT'

export const increaseFoodbowl = mAC(INCREASE_FOODBOWL, 'amount');
export const decreaseFoodbowl = mAC(DECREASE_FOODBOWL, 'amount');
export const increaseFoodLimit = mAC(INCREASE_FOOD_LIMIT);
