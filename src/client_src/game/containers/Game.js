import React, { Component } from 'react'
import { connect } from 'react-redux'

import { resetGame } from '../actions/scores'

import styles from './game_style.scss'
import Dog from "./Dog"
import Scorecard from '../components/Scorecard'
import Foodbowl from '../components/Foodbowl'
import Life from '../components/Life'

class Game extends Component {
	constructor(props) {
		super(props);
		
		this.reset = this.reset.bind(this);
	}
	
	componentDidMount() {
	}
	
	
	reset() {
		this.props.dispatch(resetGame());
		return false;
	}
	
	
	render() {
		var dogcount = Math.ceil(this.props.score / 10) + 2;
		var elems = [];
		for(var i = 1; i <= dogcount * 2; i++) {
			elems.push(<Dog key={ 'dog' + i } />);
			if(i % this.props.food_limit == 0) elems.push(<br key={ 'br' + i } />);
		}
		
		return (<div>
					Rules: You manage a set of dog kennels.
						<ul><li>Deliver resources to a kennel by dragging them from the warehouse to their destination</li>
							<li>You can only deliver resources whilst a kennel *is* open (LIGHT GREEN)</li>
							<li>Earn resources by clicking on kennels that are *not* closed (DARK BLUE)</li>
							<li>Watch out though, your central warehouse can only store { this.props.food_limit } deliveries!</li>
							<li>If more than { this.props.max_lives } kennels have to shut down, you lose your job!</li>
						</ul>
					<br />
					
					{ this.props.lives ? (
						<div>
							<div className={ [ styles.game, styles.panel ].join(' ') }>
								<Foodbowl />
								<br />
						
								{ elems.map(value => value) }
							</div>
							<div className={ styles.panel }>
								<Life />
								<Scorecard />
							</div>
						</div>
					) : (
						<div className={ [ styles.panel, styles.gameover ].join(' ') }>
							<div className={ styles.title }>Game Over!</div>
							<div className={ styles.content} ><Scorecard /></div>
							<a href="#" onClick={ this.reset }>Restart</a>
						</div>
					) }
				</div>
			);
	};
}


function mapStateToProps(state) {
	return {
		score: state.scores.currentScore,
		food_limit: state.gamestate.food_limit,
		lives: state.gamestate.lives,
		max_lives: state.gamestate.max_lives,
		};
}

export default connect(mapStateToProps)(Game)
