import React, { Component } from 'react'
import { Route, Link, NavLink, withRouter } from "react-router-dom";

import Forum from './forum/containers/Forum'
import Game from './game/containers/Game'

import styles from './app_style.scss'

class App extends Component {
	render() {
		return (<div>
				<ul className={ styles.selector }>
					<li><NavLink to="/home" activeClassName={ styles.active }>Home</NavLink></li>
					<li><NavLink to="/forum" activeClassName={ styles.active }>Forum</NavLink></li>
					<li><NavLink to="/game" activeClassName={ styles.active }>Game</NavLink></li>
				</ul>
				
				<div id="app_content">
					<Route exact path="/home" component={home} />
					<Route path="/forum" component={forum} />
					<Route path="/game" component={game} />
				</div>
			</div>);
	};
}

function home() {
	return (<div>
		Homepage
	</div>);
}

function forum() {
	return (<Forum />);
}

function game() {
	return (<Game />);
}

App = withRouter(App);
export default App
