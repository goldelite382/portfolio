import React from 'react';
import PropTypes from 'prop-types'
import App from './App'

class ContextProvider extends React.Component {
    getChildContext() {
      return { ...this.props.context }
    }

    render () {
      return <App { ...this.props } />
    }
  }

export default ContextProvider
