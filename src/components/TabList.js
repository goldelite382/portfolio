import React from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

const TabList = ({ tabs = [ { name: 'tab1' }, { name: 'tab2' }] }) => (
	<ul> Tab:
		{ tabs.map((tab, index) => (
				<Tab key={index} {...tab} />
			))
		}
	</ul>
)

TabList.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			name : PropTypes.string.isRequired,
		})
	)}
	
export default TabList;
