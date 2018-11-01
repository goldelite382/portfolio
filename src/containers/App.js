import React, { Component } from 'react'

import Content from './Content'
import Account from './Account'
import SystemDialog from './SystemDialog'

import '../../css/main.css'


class App extends Component {
	render() {
		return (
			<div>
				<SystemDialog />
				<Account />
				<Content />
			</div>
		);
	};
}


export default App
