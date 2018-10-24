import React, { Component } from 'react'

import Tabs from './Tabs'
import Content from './Content'

import '../../css/main.css'


class App extends Component {
	render() {
		return (
			<div>
				<Tabs />
				<Content />
			</div>
		);
	};
}


export default App
