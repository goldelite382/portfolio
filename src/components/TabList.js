import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

export default class TabList extends Component {
	render() {
		//const { tabs } = this.props;
		let tabs = [];
		
		return (
			<ul className='tabs'> Tab:
				{ tabs.map((tab, index) => (
						<Tab key={index} name={tab} />
					))
				}
			</ul>
		);
	}
}

TabList.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			name : PropTypes.string.isRequired,
		})
	)}

