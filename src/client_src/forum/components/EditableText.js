import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

//import styles from '../../css/main.css'

export default class EditableText extends Component {
	constructor(props) {
		super(props);
		
		this.handleChange = (e) => this.props.onChange(e.target.value);
	}
	
	
	
	render() {
		const { value, type, className, editMode } = this.props;
		
		if(editMode) {
			if(type == 'header' || type == 'text')
				return (<input type='text'
								className={ className }
								defaultValue={ value }
								onChange={ this.handleChange }
						 />);
			else if(type == 'textbody')
				return (<textarea className={ className }
								defaultValue={ value }
								onChange={ this.handleChange }
						/>);
		} else {
			if(type == 'header')
				return (<h1 className={ className }>{ value }</h1>)
			else if(type == 'text' || type == 'textbody')
				return (<div className={ className }><Markdown source={ value } /></div>)
		}
	}
}

EditableText.propTypes = {
	value : PropTypes.string.isRequired,
	type : PropTypes.string.isRequired,
	className : PropTypes.string,
	editMode : PropTypes.bool,
};
