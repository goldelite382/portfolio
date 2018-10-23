import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTabs } from '../actions';
import PropTypes from 'prop-types'

class Tabs extends Component {
	constructor(props) {
		super(props);
		
	}
	
	componentDidMount() {
		this.props.dispatch(fetchTabs());
	}
	
	render() {
		const { tabs } = this.props;
		
		return (
				<div>
					{ tabs }
				</div>
			);
	}
}


const mapStateToProps = state => {
	return { tabs : state.pages.tabs };
}

	
	
export default connect(
	mapStateToProps
)(Tabs)
