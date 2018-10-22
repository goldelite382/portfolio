'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { render } from 'react-dom'

//import { listContent, addContent } from './actions';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer);


//store.dispatch(addContent('Name', 'Title', 'Some test content'));


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('basic')
);
