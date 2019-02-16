import React, { Component } from 'react'
import { connect } from 'react-redux'

import { dismissMessage } from '../../action_head'
import Request from '../components/Request'


class SystemDialog extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		if(!this.props.message)
			return null;
		
		return (
				<div>
					<Request text={ "(1 / " + this.props.messages.length + ") " + this.props.message } succCallback={ { text: 'OK', callback: () => this.props.dispatch(dismissMessage()) } } />
				</div>
		);
	};
}


function mapStateToProps(state) {
	return {
			messages: state.misc.messages,
			
			message: state.misc.activemessage,
		};
}

export default connect(mapStateToProps)(SystemDialog)
