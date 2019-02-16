import React, { Component } from 'react'

import { connect } from 'react-redux'

import styles from "./life_style.scss"

class Life extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		
	}
	
	componentWillUnmount() {
	}
	
	
	render() {
		var lives = new Array(this.props.max_lives).fill(1);
		for(var i = this.props.max_lives - 1; i > this.props.lives - 1; i--) {
			lives[i] = 0;
		}
		
		return (
				<div	 className={ styles.liveboard }>
					{ lives.map((value, index) => (<div key={ 'life' + index } className={ [ styles.life, value ? styles.alive : styles.dead ].join(' ') } />)) }
				</div>
			);
	};
}



function mapStateToProps(state) {
	return {
			max_lives: state.gamestate.max_lives,
			lives: state.gamestate.lives,
		};
}

export default connect(mapStateToProps)(Life)
