import * as scoreActs from '../actions/scores';
import { showMessage } from '../../action_head'
		
		
export const scores = (state = { isWorking: false,
									isFetching: false,
									scores: [],
									currentScore: 0,
								}, action) => {
	switch(action.type) {
		case scoreActs.RESET:
			console.log("Resetting scores...");
			return scores(undefined, { type : undefined });
			
		case scoreActs.LOAD_SCORES_REQ:
			return Object.assign({}, state, {
				isFetching: true,
				scores: [],
			});
			
		case scoreActs.LOAD_SCORES_SUCC:
			return Object.assign({}, state, {
				isWorking: false,
				scores: action.response.scores,
			});
			
		case scoreActs.LOAD_SCORES_FAIL:
			return Object.assign({}, state, {
				isWorking: false,
				scores: [],
			});
			
		
		case scoreActs.INCREASE_SCORE:
			return Object.assign({}, state, {
				currentScore: state.currentScore + action.amount,
			});
		
		case scoreActs.DECREASE_SCORE:
			return Object.assign({}, state, {
				currentScore: state.currentScore < action.amount ? 0 : state.currentScore - action.amount,
			});
			
		default:
			return state;
	}
};


export const gamestate = (state = { max_lives: 3, lives: 3, food: 25, food_limit: 5 }, action) => {
	switch(action.type) {
		case scoreActs.RESET:
			console.log("Resetting gamestate...");
			return gamestate(undefined, { type : undefined });
			
		case scoreActs.INCREASE_LIVES:
			return Object.assign({}, state, {
				lives: state.lives + action.amount,
			});
		
		case scoreActs.DECREASE_LIVES:
			let newlives = state.lives - action.amount;
			let currentgamestate = state.gamestate;
			
			if(newlives < 0) {
				newlives = 0;
				currentgamestate = 'game_over';
			}
				
			return Object.assign({}, state, {
				gamestate: currentgamestate,
				lives: newlives,
			});
		
		case scoreActs.INCREASE_FOODBOWL:
			return Object.assign({}, state, {
				food: state.food + action.amount > 10 * state.food_limit ? 10 * state.food_limit : state.food + action.amount,
			});
			
		case scoreActs.DECREASE_FOODBOWL:
			return Object.assign({}, state, {
				food: state.food > action.amount ? state.food - action.amount : 0,
			});
		
		case scoreActs.INCREASE_FOOD_LIMIT:
			return Object.assign({}, state, {
				food_limit: state.food_limit + 1,
			});
		
		default:
			return state;
	}
};
