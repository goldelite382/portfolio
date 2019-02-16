import React, { Component /*, lazy, Suspense */ } from 'react'
import { connect } from 'react-redux'

import { loadPostTitles, loadPostBody, loadPostBodyNew } from '../actions/posts'


import Tabs from './Tabs'
import Post from './Post'

import styles from './content_style.scss'


class Content extends Component {
	constructor(props) {
		super(props);
		
		this.refreshTitles = this.refreshTitles.bind(this);
		this.selectPost = this.selectPost.bind(this);
	}
	
	componentDidMount() {
		//this.refreshTitles();
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.userid !== prevProps.userid) {
			this.refreshTitles();
		}
	}
	
	refreshTitles() {
		this.props.dispatch(loadPostTitles())
			.then( action => this.props.dispatch(loadPostBody(action.response.posts[0].id)) );
	}
	
	selectPost(id) {
		if(id)
			this.props.dispatch(loadPostBody(id));
		else
			this.props.dispatch(loadPostBodyNew());
	}
	
	render() {
		let tabs = this.props.titles.map((title, index) => ({	id: title.id,
															value: title.title,
															isLocked: title.authorid !== this.props.userid,
															callback: () => this.selectPost(title.id),
														}) );
		
		if(this.props.userid)
			tabs.push({ id: null, value: 'New Post', isLocked: false, callback: () => this.selectPost(null), });
			
		
		return (
			<div>
				<div className={styles.sideColumn}>
					<Tabs isWorking={ this.props.isLoadingTitles } selectedid={ this.props.id } tabs={ tabs } />
				</div>
				<div className={styles.mainColumn}>
					<Post key={ this.props.id } />
				</div>
			</div>
		);
		
	};
}


function mapStateToProps(state) {
	return {
			isLoadingTitles: state.postTitles.isWorking,
			isLoadingBody: state.postBody.isWorking,
			
			titles : state.postTitles.titles,
			id : state.postBody.currentPost.id,
			
			userid : state.accounts.userid,
		};
}

export default connect(mapStateToProps)(Content)
