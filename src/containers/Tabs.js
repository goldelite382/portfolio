import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { requestNewPostBody, fetchPostBody, enableEditPost, disableEditPost } from '../actions/posts';

import Tab from '../components/Tab'
import ProgressUpdater from '../components/ProgressUpdater'

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
		
		let curindex = 0;
		tabs.map((tab, index) => { if(tab.id === curid) curindex = index; });
		
		if(isLoading)
			return (<div className='tabs'><ProgressUpdater text='Fetching' /></div>);
		else
			return (
					<ul className='tabs' onWheel={ (e) => { this.selectPost(tabs[curindex + e.deltaY].id) } }>
						{ tabs.map((tab, index) => (
								<Tab key={index} selected={ tab.id == curid } isLocked={ tab.isLocked == 1 } value={tab.value} callback={ () => this.selectPost(tab.id) } />
							))
						}
						{ this.props.userid && (<Tab value="New post" callback={ () => this.selectNewPost() } />) }
					</ul>
				);
	}
}


Tabs.propTypes = {
	tabs:	PropTypes.arrayOf(
				PropTypes.shape({
					id : PropTypes.number.isRequired,
					value : PropTypes.string.isRequired,
					isLocked : PropTypes.number,
				}).isRequired,
			).isRequired,
};



function mapStateToProps(state) {
	return {
			isLoading : state.titles.isFetching,
			curid : state.body.curid,
			
			userid : state.accounts.userid,
		};
}

export default connect(mapStateToProps)(Tabs)
