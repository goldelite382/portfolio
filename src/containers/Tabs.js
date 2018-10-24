import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Tab from '../components/tab'

export class Tabs extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { tabs, callback } = this.props;
		
		return (
				<div>
					<ul className='tabs'>
						{ tabs.map((tab, index) => (
								<Tab key={index} id={'' + tab.id} value={tab.value} callback={callback} />
							))
						}
					</ul>
				</div>
			);
	}
}


Tabs.propTypes = {
	tabs:	PropTypes.arrayOf(
				PropTypes.shape({
					id : PropTypes.number.isRequired,
					value : PropTypes.string.isRequired
				}).isRequired,
			).isRequired,
	callback:	PropTypes.func.isRequired
};


