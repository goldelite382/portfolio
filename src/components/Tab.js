import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
	render() {
		const { callback, value, selected } = this.props;
		
		return (
			<li className={'tab' + (selected ? ' selected' : '') } onClick={() => callback()}>
				{ value }
			</li>
		);
	}
}

Tab.propTypes = {
	value : PropTypes.string.isRequired,
	callback : PropTypes.func.isRequired,
	selected : PropTypes.bool,
};


