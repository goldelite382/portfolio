import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from "./foodbowl_style.scss"

class Foodbowl extends Component {
	constructor(props) {
		super(props);
		
		this.onDragStart = this.onDragStart.bind(this);
	}
	
	componentDidMount() {
		
	}
	
	componentWillUnmount() {
	}
	
	onDragStart(e) {
		if(this.props.food >= 10) {
			e.dataTransfer.setData("dat", "Some Data");
		}
	}
	
	render() {
		var foods = [];
		
		var foodcount = this.props.food;
		for(var i = 0; i < this.props.food_limit; i++) {
			foods[i] = foodcount > 10 ? 10 : foodcount;
			if(foodcount > 10) foodcount -= 10; else foodcount = 0;
		}
		
		var that = this;
		return (
				<div className={ styles.foodbowl }>
					{ foods.map(function(value, index) {
						return (<div className={ [ styles.food, value < 10 ? (value < 1 ? styles.empty : styles.recharging) : styles.recharged ].join(' ') }
									draggable
									onDragStart={ that.onDragStart }
									key={ 'food' + index }
								>
									{ <div className={ styles.recharge } style={{ width: ((value * 10) + '%') }}></div> }
								</div>);
					})}
				</div>
			);
	};
}



function mapStateToProps(state) {
	return {
		food_limit: state.gamestate.food_limit,
		food: state.gamestate.food,
		};
}

export default connect(mapStateToProps)(Foodbowl)
