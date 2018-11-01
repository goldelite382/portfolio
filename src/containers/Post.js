import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import { commitPostData, requestDeletePost,
			cancelDeletePost, deletePostData,
			fetchPostTitles, fetchPostBody,
			enableEditPost, disableEditPost } from '../actions/posts'


import EditableText from '../components/EditableText'
import ProgressUpdater from '../components/ProgressUpdater'
//import Request from '../components/Request'

class Post extends Component {
	constructor(props) {
		super(props);
					
		this.submitDeletePost = this.submitDeletePost.bind(this);
		
		this.state = {  title : this.props.title,
						content : this.props.content,
					};
	}
	
	submitDeletePost(id) {
		this.props.dispatch(deletePostData(id))
			.then(() => this.props.dispatch(fetchPostTitles()) )
			.then( action => this.props.dispatch(fetchPostBody(action.response.result[0].id)) );
	}
	
	render() {
		let { id, editMode, userid, isLocked, isLoading, isSaving, requestingDeletion } = this.props;
		
		if(isLoading)
			return (<div className='post loading'><ProgressUpdater value='Fetching' /></div>);
		else if(isSaving)
			return (<div className='post loading'><ProgressUpdater value='Saving' /></div>);
		else {
			let output;
			
			if(requestingDeletion)
				output = (<Request text={ "Are you sure you want to delete '" + this.props.title + "?'" }
								succCallback={ { name: 'Yes', callback: () => this.submitDeletePost(id) } }
								failCallback={ { name: 'No', callback: () => this.props.dispatch(cancelDeletePost()) } } />
						);
					
			if(!editMode) { this.state = { title: this.props.title, content: this.props.content }; }
			
			return (	<div className="post">
						{ output }
						<EditableText editMode={ editMode } type='header' className='header' value={ this.state.title } onChange={ (val) => { this.setState({ title : val }) } } />
						
						{ id && (<div>Author: { this.props.author }</div>)}
						<hr />
						<EditableText editMode={ editMode } type='textbody' value={ this.state.content } onChange={ (val) => { this.setState({ content : val }) } } />
				
						{/* The save button */}
						{ editMode && !isLocked && (<button onClick={ () => this.props.dispatch(commitPostData(id, this.state.title, this.state.content)) }>Save</button>) }
						{ editMode && !isLocked && id && (<button onClick={ () => this.props.dispatch(requestDeletePost()) }>Delete</button>) }
						
						{ userid && editMode && id &&  (<button onClick={ () => this.props.dispatch(disableEditPost()) }>Cancel</button>) }
						{ userid && !editMode && id && (<button onClick={ () => this.props.dispatch(enableEditPost()) }>Edit</button>) }
						
					</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {	isLoading : state.body.isFetching,
			isSaving : state.body.isSaving,
			requestingDeletion : state.body.requestingDeletion,
			
			editMode : state.body.editMode,
			
			userid : state.accounts.userid,
			
			id : state.body.curid,
			title : state.body.title,
			content : state.body.content,
			author: state.body.author,
			isLocked : state.body.isLocked,
		};
}

export default connect(mapStateToProps)(Post)
