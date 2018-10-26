import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
	render() {
		const { callback, value, selected, isLocked } = this.props;
		
		return (
			<li className={'tab' + (selected ? ' selected' : '')
								+ (isLocked ? ' locked' : '')
						 } onClick={() => callback()}>
				{ value }
			</li>
		);
	}
}

Tab.propTypes = {
	value : PropTypes.string.isRequired,
	callback : PropTypes.func.isRequired,
	selected : PropTypes.bool,
	isLocked : PropTypes.bool,
};


