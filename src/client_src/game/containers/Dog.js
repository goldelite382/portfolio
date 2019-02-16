import React, { Component } from 'react'
import { connect } from 'react-redux'

import { increaseScore, decreaseScore, increaseFoodbowl, decreaseFoodbowl, increaseLives, decreaseLives } from '../actions/scores'

import styles from "./dog_style.scss"


const WORLD_INTERVAL = 10;

const modes = {	'sleep':				{ metabolism: 0,		can_feed: false,	can_pet: false,	style: styles.dog_sleep },
				'waking up':			{ metabolism: 0.3,					can_pet: true,	style: styles.dog_wake_up,		image: 'waking_up' },
				'awake':				{ metabolism: 1,		can_feed: true,	can_pet: true,	style: styles.dog_awake,			image: 'awake' },
				'falling asleep':	{ metabolism: 0.3,	can_feed: false,					style: styles.dog_fall_asleep,	image: 'falling_sleep' },
			}
				

const personalities = {
						'normal':	{	pattern: [	{ mode: 'sleep',				duration: 2 },
													{ mode: 'waking up',			duration: 0.5 },
													{ mode: 'awake',				duration: 3 },
													{ mode: 'falling asleep',	duration: 0.5 },
												],
										base_pattern_speed: 1,
										base_metabolism: 0.1,
									},
						'busy':		{	pattern:	[	{ mode: 'sleep',				duration: 1 },
													{ mode: 'waking up',			duration: 0.1 },
													{ mode: 'awake',				duration: 6 },
													{ mode: 'falling asleep',	duration: 3 },
												],
										base_pattern_speed: 1,
										base_metabolism: 0.2,
									},
						'quiet':		{	pattern: [	{ mode: 'sleep',				duration: 6 },
													{ mode: 'waking up',			duration: 1 },
													{ mode: 'awake',				duration: 3 },
													{ mode: 'falling asleep',	duration: 1 },
												],
										base_pattern_speed: 1,
										base_metabolism: 0.05,
									},
					}
					
					
export class Dog extends Component {
	constructor(props) {
		super(props);
		
		this.tick = this.tick.bind(this);
		this.updateScore = this.updateScore.bind(this);
		
		var personalityIndex = Math.floor(Math.random() * (Object.keys(personalities).length - 1));
		var personality = personalities[Object.keys(personalities)[personalityIndex]];
		this.state = {
						personality_name: Object.keys(personalities)[personalityIndex],
						personality: personality,
						mode_index: 0,
						
						base_metabolism: personality.base_metabolism,
						base_speed: personality.base_pattern_speed,
						
						seconds_remaining: 0,
						hunger: 0,
						metabolism: 1,
						can_feed: false,
						can_pet: false,
						style: modes[personality.pattern[0].mode].style,
					};
	}
	
	tick() {
		var me = this.state.personality;
		
		if(this.state.seconds_remaining <= 1) {
			console.log("Updating mode");
			var pattern = this.state.personality.pattern;
			var nextModeIndex = this.state.mode_index + 1;
			if(nextModeIndex >= pattern.length) nextModeIndex = 0;
			var nextMode = modes[pattern[nextModeIndex].mode];
			
			
			var canFeed = this.state.can_feed;		if("can_feed" in nextMode) canFeed = nextMode.can_feed;
			var canPet = this.state.can_pet;			if("can_pet" in nextMode) canPet = nextMode.can_pet;
			var metabolism = this.state.metabolism;	if("metabolism" in nextMode) metabolism = this.state.base_metabolism * nextMode.metabolism;
			var style = this.state.style;				if("style" in nextMode) style = nextMode.style;
			
			var rangeMin = pattern[nextModeIndex].duration * 0.9;
			var rangeMax = pattern[nextModeIndex].duration * 1.1;
			var newDuration = (Math.random() * (rangeMax - rangeMin)) + rangeMin;
			newDuration /= this.state.base_speed;
			
			
			this.setState(state => ({	seconds_remaining: newDuration + 1,
										mode_index: nextModeIndex,
										
										can_feed: canFeed,
										can_pet: canPet,
										metabolism: metabolism,
										style: style,
									})
						);
		}
		
		// Dog dies if too hungry
		if(this.state.hunger >= 1) {
			this.setState({ personality: undefined });
			this.props.dispatch(decreaseLives(1));
			clearInterval(this.interval);
			return;
		}
		
		
		this.setState(state => ({	seconds_remaining : state.seconds_remaining - (1 / WORLD_INTERVAL),
									hunger : state.hunger + ((state.metabolism * state.base_speed * Math.random()) / WORLD_INTERVAL),
								 }) );
	}
	
	updateScore() {
		if(this.state.can_pet) {
			this.props.dispatch(increaseFoodbowl(1));
		}
	}
	
	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000 / WORLD_INTERVAL);
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	
	onDragOver(ev) {
		console.log("Dragging OVER");
		ev.preventDefault();
	}
	
	onDrop(ev, cat) {
		if(this.state.can_feed) {
			this.setState({ hunger : 0 });
			this.props.dispatch(decreaseFoodbowl(10));
			this.props.dispatch(increaseScore(1));
		}
	}
	
	
	render() {
		var h = this.state.hunger;
		if(h > 1) h = 1;
		h *= 100;
		
		if(this.state.personality == undefined)
			return (<div className={ [ styles.dog, styles.dog_dead ].join(' ') }>
						<div className={ styles.hunger_marker }><div className={ styles.hunger_fill }></div></div>
						<span className={ styles.name }>(Closed)</span>
					</div>);
		else
			return (
					<div		ref={ input => this.myDog = input }
							className={ [ styles.dog, this.state.style, ].join(' ') }
							onClick={ () => this.updateScore() }
							onDragOver={ (e) => this.onDragOver(e) }
							onDrop={ (e) => this.onDrop(e) }
						>
					
						<div className={ styles.hunger_marker }>
							<div		className={ styles.hunger_fill }
									style={{ height: h + '%',
											 backgroundColor: 'hsl(' + (120 - ((120 / 100) * h)) + ' , 80%, 40%)',
											}}
								>
							</div>
						</div>
						
						<span className={ styles.name }>
							{ this.state.personality_name }
						</span>
					</div>
				);
	};
}


function mapStateToProps(state) {
	return {
		};
}

export default connect(mapStateToProps)(Dog)
