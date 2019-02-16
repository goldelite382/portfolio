import React, { Component } from 'react'

import Content from './Content'
import Account from './Account'
import SystemDialog from './SystemDialog'


export default class Forum extends Component {
	render() {
		return (<div>
				<SystemDialog />
				<Account />
				<Content />
			</div>);
	};
}
