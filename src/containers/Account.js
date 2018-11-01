import React, { Component } from 'react'
import { connect } from 'react-redux'
//import cookie from 'react-cookies';

//import Request from '../components/Request'
import { showMessage } from '../actions/index'
import { fetchUserToken, validateUserToken, deauthUserToken,
		showLoginPanel, hideLoginPanel,
		showResponse, hideResponse } from '../actions/accounts'

class Account extends Component {
	constructor(props) {
		super(props);
		
		this.state = { username: 'goldelite', password: 'password' };
	}
	
	componentDidMount() {
		let userid = ''; //cookie.load('userid') || '';
		let token = ''; //cookie.load('token') || '';
		
		if(token != 'undefined') {
			this.props.dispatch(validateUserToken(userid, token))
				.then(	result => { //cookies.set('userid', result.response.userid);
									//cookies.set('token', result.response.token);
									//console.log("Set: '" + cookie.load('token') + "', '" + cookie.load('userid') + "'");
								});
		}
	}
	
	render() {
		let { isAuthed, showLogin, showResponse, response, username, userid, token } = this.props;
		
		return (
			<div className="login-panel">
				{ isAuthed && (<div>Welcome, { username } ({ token } / { userid }) <a href="#" onClick={ () => this.props.dispatch(deauthUserToken(this.props.userid, this.props.token)) }>Logout</a></div>) }
				{ !isAuthed && !showLogin && (<button onClick={ () => this.props.dispatch(showLoginPanel()) } >Login</button>) }
				
				{ !isAuthed && showLogin &&
					(<div>Username: <input defaultValue='goldelite' onChange={ e => this.setState({ username: e.target.value }) } />
						Password: <input defaultValue='password' onChange={ e => this.setState({ password: e.target.value }) } />
						
						<button onClick={ () => this.props.dispatch(fetchUserToken(this.state.username, this.state.password)) }>Send</button>
						<button onClick={ () => this.props.dispatch(hideLoginPanel()) }>Cancel</button>
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
		};
}

export default connect(mapStateToProps)(Account)
