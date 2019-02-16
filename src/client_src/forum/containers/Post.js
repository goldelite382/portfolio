import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import { loadPostTitles, loadPostBody,
			deletePostVerify, deletePostAbort, deletePost,
			enablePostEditable, disablePostEditable, savePost
		} from '../actions/posts'


import EditableText from '../components/EditableText'
import ProgressUpdater from '../components/ProgressUpdater'
import Request from '../components/Request'

import styles from './post_style.scss'


class Post extends Component {
	constructor(props) {
		super(props);
					
		this.submitDeletePost = this.submitDeletePost.bind(this);
		
		this.state = {  title : this.props.post.title,
						content : this.props.post.content,
						isLocked: false,
						isPublic: this.props.post.isPublic,
					};
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.isEditable !== prevProps.isEditable) {
			this.setState({ title: this.props.post.title, content: this.props.post.content });
		}
	}
	
	submitDeletePost(id) {
		this.props.dispatch(deletePost(id))
			.then(() => this.props.dispatch(loadPostTitles()) )
			.then( action => this.props.dispatch(loadPostBody(action.response.posts[0].id)) );
	}
	
	
	render() {
		let { isWorking, isEditable, showDeleteVerify,
			post, userid, isLocked } = this.props;
		
		if(isWorking)
			return (<div className={ [styles.post, styles.loading].join(' ') }><ProgressUpdater value='Processing' /></div>);
		else {
			let output, buttons = {};
			
			if(showDeleteVerify)
				output = (<Request text={ "Are you sure you want to delete '" + post.title + "?'" }
								succCallback={ { name: 'Yes', callback: () => this.submitDeletePost(post.id) } }
								failCallback={ { name: 'No', callback: () => this.props.dispatch(deletePostAbort()) } } />
						);
			
			
			if(isEditable && !isLocked)
				buttons.save = <button onClick={ () => this.props.dispatch(savePost(post.id, this.state.title, this.state.content, this.state.isLocked ? 1 : 0, this.state.isPublic ? 1 : 0)) }>Save</button>;
			if(isEditable && !isLocked && post.id)
				buttons.delete = <button onClick={ () => this.props.dispatch(deletePostVerify()) }>Delete</button>;
			if(userid && post.id && isEditable)
				buttons.editCancel = <button onClick={ () => this.props.dispatch(disablePostEditable()) }>Cancel</button>;
			if(userid && post.id && !isEditable && post.authorid===userid)
				buttons.edit = <button onClick={ () => this.props.dispatch(enablePostEditable()) }>Edit</button>;
				
			
			return (	<div className={ styles.post }>
						{ output }
						<EditableText editMode={ isEditable } type='header' className={ styles.header } value={ this.state.title } onChange={ (val) => { this.setState({ title : val }) } } />
						
						{ post.id && (<div>Author: { post.author }</div>)}
						<hr />
						<EditableText editMode={ isEditable } type='textbody' value={ this.state.content } onChange={ (val) => { this.setState({ content : val }) } } />
						
						{ isEditable && (<div>
							<label><input type='checkbox' defaultChecked={ this.state.isPublic } onChange={ () => this.setState({ isPublic: !this.state.isPublic }) }/>Is public</label>
						</div>) }
						{ buttons.save } { buttons.delete }{ buttons.edit } { buttons.editCancel }
					</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {	isWorking : state.postBody.isWorking,
			isEditable : state.postBody.isEditable,

			showDeleteVerify : state.postBody.showDeleteVerify,
			userid : state.accounts.userid,
			
			post: state.postBody.currentPost,
		};
}

export default connect(mapStateToProps)(Post)
