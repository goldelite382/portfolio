'use strict';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { render } from 'react-dom'

//import { listContent, addContent } from './actions';
import rootReducer from './reducers';
import App from './containers/App';

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();
const store = createStore(rootReducer,
						applyMiddleware( thunkMiddleware, loggerMiddleware)
			);


//store.dispatch(addContent('Name', 'Title', 'Some test content'));


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('basic')
);
