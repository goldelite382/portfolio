import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showMessage } from '../../action_head'
import { newUserToken, checkUserToken, destroyUserToken, createUser,
		showLoginPanel, hideLoginPanel, showRegisterPanel, hideRegisterPanel,
		showResponse, hideResponse } from '../actions/accounts'

import styles from './account_style.scss'

class Account extends Component {
	constructor(props) {
		super(props);
		
		this.state = { email: 'goldelite382@gmail.com', username: 'goldelite', password: 'password' };
		
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	
	componentDidMount() {
		this.props.dispatch(checkUserToken());
	}
	
	login() {
		this.props.dispatch(newUserToken(this.state.username, this.state.password));
	}
	
	register() {
		this.props.dispatch(createUser(this.state.email, this.state.username, this.state.password));
	}
	
	logout() {
		this.props.dispatch(destroyUserToken());
	}
	
	render() {
		let { isAuthed, showLogin, showRegister, showResponse, response, username, userid, token } = this.props;
		
		return (
			<div className={styles.loginPanel}>
				{ isAuthed && (<div>Welcome, { username } <a href="#" onClick={ () => this.logout() }>Logout</a></div>) }
				{ !isAuthed && !showLogin && !showRegister && (<button onClick={ () => this.props.dispatch(showLoginPanel()) } >Login</button>) }
				{ !isAuthed && !showLogin && !showRegister && (<button onClick={ () => this.props.dispatch(showRegisterPanel()) }>Register</button>) }
				
				{ !isAuthed && showLogin &&
					(<div>
						Username: <input defaultValue='goldelite' onChange={ e => this.setState({ username: e.target.value }) } />
						Password: <input defaultValue='password' onChange={ e => this.setState({ password: e.target.value }) } />
						
						<button onClick={ () => this.login() }>Send</button>
						<button onClick={ () => this.props.dispatch(hideLoginPanel()) }>Cancel</button>
					</div>)
				}
				
				{ !isAuthed && showRegister &&
					(<div>
						Username: <input defaultValue='' onChange={ e => this.setState({ username: e.target.value }) } />
						Password: <input defaultValue='' onChange={ e => this.setState({ password: e.target.value }) } />
						E-mail:   <input defaultValue='' onChange={ e => this.setState({ email: e.target.value }) } />
						
						<button onClick={ () => this.register() }>Register</button>
						<button onClick={ () => this.props.dispatch(hideRegisterPanel()) }>Cancel</button>
					</div>)
				}
			</div>
			);
	};
}


function mapStateToProps(state) {
	return {
			isAuthed: state.accounts.isAuthed,
			showResponse: state.accounts.showResponse,
			response: state.accounts.response,
			
			token: state.accounts.token,
			userid: state.accounts.userid,
			username: state.accounts.username,
			
			showLogin: state.accounts.showLogin,
			showRegister: state.accounts.showRegister,
		};
}

export default connect(mapStateToProps)(Account)
