import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { cycleUpdaterDots } from '../actions'


class ProgressUpdater extends Component {
	constructor(props) {
		super(props);
		
		this.timer = null;
	}
	
	componentDidMount() {
		if(this.timer) clearInterval(this.timer);
		this.timer = setInterval(() => this.props.dispatch(cycleUpdaterDots()), 100);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}
	
	render() {
		return (
			<div className="updater">
				{ this.props.text || 'Loading' }<span id="updater-dots">{'.'.repeat(this.props.dotcount)}</span>
			</div>
		);
	}
}

ProgressUpdater.propTypes = {
	text : PropTypes.string,
}

const mapStateToProps = state => {
	return { dotcount : state.updater.dotcount,
			};
}

export default connect(mapStateToProps)(ProgressUpdater)
