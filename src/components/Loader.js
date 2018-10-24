import React, { Component } from 'react';
import { connect } from 'react-redux'

import { cycleLoaderDots, receiveTabs } from '../actions'


class Loader extends Component {
	constructor(props) {
		super(props);
		
		this.timer = null;
	}
	
	componentDidMount() {
		if(this.timer) clearInterval(this.timer);
		this.timer = setInterval(() => this.props.dispatch(cycleLoaderDots()), 100);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}
	
	render() {
		console.log(this.props.dotcount);
		return (
			<div className="loader">
				Loading<span id="loader-dots">{'.'.repeat(this.props.dotcount)}</span>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return { dotcount : state.loader.dotcount,
			};
}

export default connect(mapStateToProps)(Loader)
