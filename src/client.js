'use strict';

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";

import { createAppStore } from './client_src/store';
import App from './client_src/App';

// Create the store
	const preloadedState = window.__PRELOADED_STATE__
	delete window.__PRELOADED_STATE__
	
	const store = createAppStore(preloadedState);
	




const app = document.getElementById('root');
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	app);
