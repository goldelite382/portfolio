import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { requestNewPostBody, fetchPostBody, enableEditPost, disableEditPost } from '../actions/';

import Tab from '../components/tab'
import ProgressUpdater from '../components/progressupdater'

class Tabs extends Component {
	constructor(props) {
		super(props);
		
		this.selectPost = this.selectPost.bind(this);
		this.selectNewPost = this.selectNewPost.bind(this);
	}
	
	
	selectPost(id) {
		this.props.dispatch(fetchPostBody(id));
		this.props.dispatch(disableEditPost());
	}
	
	selectNewPost() {
		this.props.dispatch(requestNewPostBody());
		this.props.dispatch(enableEditPost());
	}
	
	render() {
		const { tabs, callback, isLoading, curid } = this.props;
		
		if(isLoading)
			return (<div className='tabs'><ProgressUpdater text='Fetching' /></div>);
		else
			return (
					<ul className='tabs'>
						{ tabs.map((tab, index) => (
								<Tab key={index} selected={ tab.id == curid } isLocked={ tab.isLocked } value={tab.value} callback={ () => this.selectPost(tab.id) } />
							))
						}
						<Tab value="New post" callback={ () => this.selectNewPost() } />
					</ul>
				);
	}
}


Tabs.propTypes = {
	tabs:	PropTypes.arrayOf(
				PropTypes.shape({
					id : PropTypes.number.isRequired,
					value : PropTypes.string.isRequired,
					isLocked : PropTypes.bool,
				}).isRequired,
			).isRequired,
};



function mapStateToProps(state) {
	return {
			isLoading : state.titles.isFetching,
			curid : state.body.curid,
		};
}

export default connect(mapStateToProps)(Tabs)
