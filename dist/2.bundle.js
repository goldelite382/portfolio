(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{154:function(t,e,n){"use strict";n.r(e);var o=n(1),r=n.n(o),i=n(6),a=n(3),u=n.n(a),c=n(2),s=n(74),l=n.n(s);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function b(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=b(this,y(e).call(this,t))).handleChange=function(t){return n.props.onChange(t.target.value)},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(e,o["Component"]),function(t,e,n){e&&f(t.prototype,e),n&&f(t,n)}(e,[{key:"render",value:function(){var t=this.props,e=t.value,n=t.type,o=t.className;if(t.editMode){if("header"==n||"text"==n)return r.a.createElement("input",{className:o,defaultValue:e,onChange:this.handleChange});if("textbody"==n)return r.a.createElement("textarea",{className:o,defaultValue:e,onChange:this.handleChange})}else{if("header"==n)return r.a.createElement("h1",{className:o},e);if("text"==n||"textbody"==n)return r.a.createElement("div",{className:o},r.a.createElement(l.a,{source:e}))}}}]),e}();h.propTypes={value:u.a.string.isRequired,type:u.a.string.isRequired,className:u.a.string,editMode:u.a.bool};var m=n(61);function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t,e){return(w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function E(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var j=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=function(t,e){return!e||"object"!==v(e)&&"function"!=typeof e?E(t):e}(this,O(e).call(this,t))).submitDeletePost=n.submitDeletePost.bind(E(E(n))),n.state={title:n.props.title,content:n.props.content},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(e,o["Component"]),function(t,e,n){e&&g(t.prototype,e),n&&g(t,n)}(e,[{key:"submitDeletePost",value:function(t){var e=this;this.props.dispatch(Object(c.t)(t)).then(function(){return e.props.dispatch(Object(c.x)())}).then(function(t){return e.props.dispatch(Object(c.w)(t.response.result[0].id))})}},{key:"render",value:function(){var t,e=this,n=this.props,o=n.id,i=n.editMode,a=n.userid,u=n.isLocked,s=n.isLoading,l=n.isSaving,p=n.requestingDeletion;return s?r.a.createElement("div",{className:"post loading"},r.a.createElement(m.a,{value:"Fetching"})):l?r.a.createElement("div",{className:"post loading"},r.a.createElement(m.a,{value:"Saving"})):(p&&(t=r.a.createElement(Request,{text:"Are you sure you want to delete '"+this.props.title+"?'",succCallback:{name:"Yes",callback:function(){return e.submitDeletePost(o)}},failCallback:{name:"No",callback:function(){return e.props.dispatch(Object(c.r)())}}})),i||(this.state={title:this.props.title,content:this.props.content}),r.a.createElement("div",{className:"post"},t,r.a.createElement(h,{editMode:i,type:"header",className:"header",value:this.state.title,onChange:function(t){e.setState({title:t})}}),o&&r.a.createElement("div",null,"Author: ",this.props.author),r.a.createElement("hr",null),r.a.createElement(h,{editMode:i,type:"textbody",value:this.state.content,onChange:function(t){e.setState({content:t})}}),i&&!u&&r.a.createElement("button",{onClick:function(){return e.props.dispatch(Object(c.s)(o,e.state.title,e.state.content))}},"Save"),i&&!u&&o&&r.a.createElement("button",{onClick:function(){return e.props.dispatch(Object(c.y)())}},"Delete"),a&&i&&o&&r.a.createElement("button",{onClick:function(){return e.props.dispatch(Object(c.u)())}},"Cancel"),a&&!i&&o&&r.a.createElement("button",{onClick:function(){return e.props.dispatch(Object(c.v)())}},"Edit")))}}]),e}();e.default=Object(i.b)(function(t){return{isLoading:t.body.isFetching,isSaving:t.body.isSaving,requestingDeletion:t.body.requestingDeletion,editMode:t.body.editMode,userid:t.accounts.userid,id:t.body.curid,title:t.body.title,content:t.body.content,author:t.body.author,isLocked:t.body.isLocked}})(j)},61:function(t,e,n){"use strict";n.d(e,"a",function(){return p});var o=n(1),r=n.n(o),i=n(3);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var p=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=c(this,s(e).call(this,t))).timer=null,n.state={dotCount:1},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,o["Component"]),function(t,e,n){e&&u(t.prototype,e),n&&u(t,n)}(e,[{key:"componentDidMount",value:function(){var t=this;this.timer&&clearInterval(this.timer),this.timer=setInterval(function(){return t.setState({dotCount:t.state.dotCount>=3?0:t.state.dotCount+1})},100)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer),this.timer=null}},{key:"render",value:function(){return r.a.createElement("div",{className:"updater"},this.props.text||"Loading",r.a.createElement("span",{id:"updater-dots"},".".repeat(this.state.dotCount)))}}]),e}();p.propTypes={text:i.PropTypes.string}}}]);