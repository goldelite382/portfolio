import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostTitles, fetchPostBody } from '../actions/'
import { Tabs } from './Tabs'
import { Post } from '../components/Post'
import Loader from '../components/loader'

import '../../css/main.css'


class Content extends Component {
	constructor(props) {
		super(props);
		
		this.selectPost = this.selectPost.bind(this);
	}
	
	
	componentDidMount() {
		this.props.dispatch(fetchPostTitles());
	}
	
	selectPost(id) {
		this.props.dispatch(fetchPostBody(id));
	}
	
	render() {
		const { titles, isFetchingTitles, isFetchingBody } = this.props;
		
		return (
			<div>
				{ isFetchingTitles && (<div><Loader /></div>) }
				{ !isFetchingTitles && (
					<div>
						<ul className='tabs'>
								<Tabs tabs={ titles.map((tab, index) => ( { id : tab.id, value : tab.title } )) } callback={this.selectPost} />
						</ul>
						{ isFetchingBody && (<div><Loader /></div>) }
						{ !isFetchingBody && (<div><Post content={ this.props.content } /></div>) }
					</div>
				)}
			</div>
		);
	};
}


function mapStateToProps(state) {
	return {	isFetchingTitles : state.titles.isFetching,
			isFetchingBody : state.body.isFetching,
			titles : state.titles.titles,
			content : state.body.content };
}

export default connect(mapStateToProps)(Content)
