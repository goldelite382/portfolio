import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import { fetchPostTitles, fetchPostBody } from '../actions/posts'

const Tabs = React.lazy(() => import('./Tabs'));
const Post = React.lazy(() => import('./Post'));

import '../../css/main.css'


class Content extends Component {
	constructor(props) {
		super(props);
		
		this.refreshTitles = this.refreshTitles.bind(this);
	}
	
	componentDidMount() {
		this.refreshTitles();
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.userid !== prevProps.userid) {
			this.refreshTitles();
		}
	}
	
	refreshTitles() {
		this.props.dispatch(fetchPostTitles())
			.then( action => this.props.dispatch(fetchPostBody(action.response.posts[0].id)) );
	}
	
	render() {
		const { id, titles } = this.props;
		
		return (
			<div>
				<Suspense fallback={<div>Loading post list...</div>}>
					<div className="side-column">
						<Tabs tabs={ titles.map((tab, index) => ( { id : tab.id, value : tab.title, isLocked : tab.locked } )) } />
					
					</div>
				</Suspense>
				
				<Suspense fallback={<div>Loading posts...</div>}>
					<div className="main-column">
						<Post key={ id } />
					</div>
				</Suspense>
			</div>
		);
	};
}


function mapStateToProps(state) {
	return {	titles : state.titles.titles,
			id : state.body.curid,
		};
}

export default connect(mapStateToProps)(Content)
