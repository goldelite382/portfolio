import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostTitles, enableEditPost, disableEditPost } from '../actions/'
import Tabs from './Tabs'
import Post from '../containers/Post'
import ProgressUpdater from '../components/progressupdater'

import '../../css/main.css'


class Content extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.dispatch(fetchPostTitles());
	}
	
	render() {
		const { id, titles, editMode } = this.props;
		
		return (
			<div>
				{ editMode &&  (<button onClick={ () => this.props.dispatch(disableEditPost()) }>Cancel</button>) }
				{ !editMode && (<button onClick={ () => this.props.dispatch(enableEditPost()) }>Edit</button>) }
				
				<Tabs tabs={ titles.map((tab, index) => ( { id : tab.id, value : tab.title } )) } />
				
				<Post key={ id } />
			</div>
		);
	};
}


function mapStateToProps(state) {
	return {	editMode : state.body.editMode,
			
			titles : state.titles.titles,
			id : state.body.curid,
		};
}

export default connect(mapStateToProps)(Content)
