'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_React$Component) {
	_inherits(Group, _React$Component);

	function Group(props) {
		_classCallCheck(this, Group);

		var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, props));

		_this.state = {
			title: 'Content', page: '<strong>This is some content</strong>'
		};
		return _this;
	}

	_createClass(Group, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ id: 'tabs' },
					React.createElement(Tabs, null)
				),
				React.createElement(
					'div',
					{ id: 'contents' },
					React.createElement(Page, null)
				)
			);
		}
	}]);

	return Group;
}(React.Component);

var Tabs = function (_React$Component2) {
	_inherits(Tabs, _React$Component2);

	function Tabs(props) {
		_classCallCheck(this, Tabs);

		var _this2 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

		_this2.state = { tabs: [] };
		return _this2;
	}

	_createClass(Tabs, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			fetch("http://127.0.0.1:3000/tabs").then(function (res) {
				return res.json();
			}).then(function (result) {
				_this3.setState({ tabs: result });
			}, function (error) {
				_this3.setState({ tabs: [] });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var tablist = this.state.tabs.map(function (tab, index) {
				return React.createElement(
					'li',
					{ key: 't' + index, onClick: function onClick() {
							alert('hi ' + tab + '!');
						} },
					tab
				);
			});

			return React.createElement(
				'ul',
				null,
				tablist
			);
		}
	}]);

	return Tabs;
}(React.Component);

var Page = function (_React$Component3) {
	_inherits(Page, _React$Component3);

	function Page() {
		_classCallCheck(this, Page);

		return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
	}

	_createClass(Page, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'span',
					null,
					'aaa'
				)
			);
		}
	}]);

	return Page;
}(React.Component);

function tick() {
	ReactDOM.render(React.createElement(Group, null), document.getElementById('basic'));
}

tick();