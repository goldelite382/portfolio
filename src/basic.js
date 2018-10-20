'use strict';


class Group extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
						title : 'Content', page : '<strong>This is some content</strong>',
					 };
	};
	
	render() {
		return (
				<div>
					<div id="tabs"><Tabs /></div>
					<div id="contents"><Page /></div>
				</div>
			);
	}
}

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { tabs : [] };
	}
	
	componentDidMount() {
		fetch("http://127.0.0.1:3000/tabs")
			.then(res => res.json())
			.then(
				result => { this.setState({ tabs : result }); },
				error => { this.setState({ tabs : [] }); }
				)
	}
	
	render() {
		let tablist = this.state.tabs.map((tab, index) => <li key={ 't' + index } onClick={ () => { alert('hi ' + tab + '!'); } }>{tab}</li>);
		
		return (
				<ul>{tablist}</ul>
			);
	}
}

class Page extends React.Component {
	render() {
		return (
				<div>
					<span>aaa</span>
				</div>
			);
	}
}




function tick() {
	ReactDOM.render(
			  <Group />,
			  document.getElementById('basic')
			);
}

tick();
