import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tab from '../components/Tab'
import ProgressUpdater from '../components/ProgressUpdater'

import styles from './tabs_style.scss'

export default class Tabs extends Component {
	render() {
		let curindex = 0;
		
		let tabs = this.props.tabs || [];
		tabs.map((tab, index) => { if(tab.id === this.props.selectedid) curindex = index; });
		
		if(this.props.isWorking)
			return (<div className={ styles.tabs }><ProgressUpdater text='Fetching' /></div>);
		else
			return (
					<ul className={ styles.tabs } onWheel={ (e) => { tabs[curindex + e.deltaY].callback() } }>
						{ tabs.map((tab, index) => (
								<Tab		key={index}
										selected={ index == curindex }
										isLocked={ tab.isLocked }
										value={ tab.value }
										callback={ tab.callback }
								/>
							))
						}
					</ul>
				);
	}
}


Tabs.propTypes = {
	isWorking: PropTypes.bool,
	selectedid: PropTypes.number,
	tabs:	PropTypes.arrayOf(
				PropTypes.shape({
					id : PropTypes.number,
					value : PropTypes.string.isRequired,
					isLocked : PropTypes.bool,
					callback: PropTypes.func,
				}).isRequired,
			).isRequired,
};
