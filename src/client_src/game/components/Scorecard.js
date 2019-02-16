import React, { Component } from 'react'

import { connect } from 'react-redux'

import styles from "./scorecard_style.scss"

class Scorecard extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		
	}
	
	componentWillUnmount() {
	}
	
	
	render() {
		
		return (
				<div	 className={ styles.scorecard }>
					Score: { this.props.curScore } point{ this.props.curScore == 1 ? '' : 's' }
				</div>
			);
	};
}



function mapStateToProps(state) {
	return {
			curScore: state.scores.currentScore,
		};
}

export default connect(mapStateToProps)(Scorecard)
