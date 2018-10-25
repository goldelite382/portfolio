import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import { commitPostData } from '../actions/'

import EditableText from '../components/EditableText'
import ProgressUpdater from '../components/progressupdater'

class Post extends Component {
	constructor(props) {
		super(props);
		
		this.state = {  title : this.props.title,
						content : this.props.content,
					};
	}
	
	render() {
		let { editMode, isLoading, isSaving } = this.props;
		
		if(isLoading)
			return (<div className='post'><ProgressUpdater value='Fetching' /></div>);
		else if(isSaving)
			return (<div className='post'><ProgressUpdater value='Saving' /></div>);
		else {
			if(!editMode) { this.state = { title: this.props.title, content: this.props.content }; }
			
			return (
				<div className="post">
					<EditableText editMode={ editMode } type='header' className='header' value={ this.state.title } onChange={ (val) => { this.setState({ title : val }) } } />
					<hr />
					<EditableText editMode={ editMode } type='textbody' value={ this.state.content } onChange={ (val) => { this.setState({ content : val }) } } />
				
					{/* The save button */}
					{ editMode && (<button onClick={ () => this.props.dispatch(commitPostData(this.props.id, this.state.title, this.state.content)) }>Save</button>) }
					
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {	isLoading : state.body.isFetching,
			isSaving : state.body.isSaving,
			
			editMode : state.body.editMode,
			
			id : state.body.curid,
			title : state.body.title,
			content : state.body.content,
		};
}

export default connect(mapStateToProps)(Post)
