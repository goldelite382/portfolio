import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

export default class Request extends Component {
	constructor(props) {
		super(props);
		
		this.succCallback = this.succCallback.bind(this);
		this.failCallback = this.failCallback.bind(this);
	}
	
	succCallback() {
		if(this.props.succCallback && this.props.succCallback.callback)
			this.props.succCallback.callback(true);
	}
	
	failCallback() {
		if(this.props.failCallback && this.props.failCallback.callback)
			this.props.failCallback.callback(false);
	}
	
	render() {
		return (
			<div className="requestDialog">
				{ this.props.text }
				<br /><br />
				{ this.props.succCallback && (<button onClick={ () => this.succCallback() }>{ this.props.succCallback.name || 'OK' }</button>) }
				{ this.props.failCallback && (<button onClick={ () => this.failCallback() }>{ this.props.failCallback.name || 'Cancel' }></button>) }
			</div>
		);
	}
}

Request.propTypes = {
	text : PropTypes.string,
	succCallback: PropTypes.shape({
			name: PropTypes.string,
			callback: PropTypes.func.isRequired,
		}),
	failCallback: PropTypes.shape({
			name: PropTypes.string,
			callback: PropTypes.func,
		}),
}

