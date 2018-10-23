import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
	render() {
		return (
			<div>
				{props.name}
			</div>
		);
	}
}

Tab.propTypes = {
	name : PropTypes.string.isRequired
};


