import React, { Component } from 'react';
import { PropTypes } from 'prop-types'

import styles from './progressupdater_style.scss'

export default class ProgressUpdater extends Component {
	constructor(props) {
		super(props);
		
		this.timer = null;
		this.state = { dotCount: 1 };
	}
	
	componentDidMount() {
		if(this.timer) clearInterval(this.timer);
		this.timer = setInterval(() => ( this.setState({ dotCount: (this.state.dotCount >= 3 ? 0 : this.state.dotCount + 1) }) ), 100 );
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}
	
	render() {
		return (
			<div className={ styles.updater }>
				{ this.props.text || 'Loading' }<span id="updater-dots">{'.' . repeat(this.state.dotCount) }</span>
			</div>
		);
	}
}

ProgressUpdater.propTypes = {
	text : PropTypes.string,
}

