import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Post extends Component {
	render() {
		return (
			<div className="post">{ this.props.content }</div>
		);
	}
}

Post.propTypes = {
	content : PropTypes.string.isRequired
};
