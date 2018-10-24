import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
	render() {
		const { callback, id, value } = this.props;
		
		return (
			<li className="tab" onClick={() => callback(id)}>
				{ id }) { value }
			</li>
		);
	}
}

Tab.propTypes = {
	id : PropTypes.string.isRequired,
	value : PropTypes.string.isRequired,
	callback : PropTypes.func.isRequired,
};


