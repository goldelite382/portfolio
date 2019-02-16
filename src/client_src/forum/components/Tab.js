import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './tab_style.scss'


export default class Tab extends Component {
	render() {
		const { callback, value, selected, isLocked } = this.props;
		
		return (
			<li className={ [	styles.tab,
								(selected ? styles.selected : undefined),
								(isLocked ? styles.locked : undefined),
							].join(' ') } onClick={() => callback()}>
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


