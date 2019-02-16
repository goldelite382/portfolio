'use strict';

import React from 'react';
import 'babel-polyfill';
import { StaticRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'


import { createAppStore, manuallyInitialiseStore } from './client_src/store';
import App from './client_src/App';

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const util = require('util');
const session = require('express-session')


const fs = require('fs'); // to check if the file exists

const baseEnv = path.join(process.cwd()) + '/.env'
var currentEnv = baseEnv;
if(process.env.ENVIRONMENT) currentEnv += '.' + process.env.ENVIRONMENT;
const trueEnv = fs.existsSync(currentEnv) ? currentEnv : baseEnv;
const dotenv = require('dotenv').config({ path: trueEnv });


// GLOBAL CONFIG
const cors_origin = process.env.srv_cors_origin || "???";
const hostname = process.env.srv_addr || '???';
const port = process.env.srv_port || '???';

const db_connLimit = 10;
const db_host     = process.env.db_host || '???';
const db_database = process.env.db_database || '???';
const db_username = process.env.db_username || '???';
const db_password = process.env.db_password || '???';



// Setup the Webserver
	let srv = express();
	console.log("Starting...");
	
	// Turn incoming json in the request body into a useable hash
	srv.use(bodyParser.json());
	srv.use(bodyParser.urlencoded({ extended: true }));
	srv.use(session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: true
		}))
	
	// Enable CORS stuff -- probably not needed in production, but for my dev env
	//					   this hosts RESTful stuff and webpackage hosts the react/redux stuff
	srv.use(
	  function crossOrigin(req,res,next){
	  	res.header("Access-Control-Allow-Origin", cors_origin);
		//res.header("Access-Control-Allow-Origin", "http://localhost:8080");
		//res.header("Access-Control-Allow-Origin", "http://transpire.us.openode.io/");
		res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Headers", "content-type");
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		return next();
	  }
	);
	
	
		
	// Setup the database connection
	let db = mysql.createPool({
		  host: db_host,
		  user: db_username,
		  password: db_password,
		  database: db_database,
	      connectionLimit: db_connLimit,
		});
	
	console.log("Connecting to database " + db_host + ":" + db_database + "...");
	db.query = util.promisify(db.query);
	db.getConnection = util.promisify(db.getConnection); // Test for a working connection
	
	// Test for a working connection
	db.getConnection((err, connection) => {
		if (err) {
			switch(err.code) {
				case 'PROTOCOL_CONNECTION_LOST':
					console.error('Database connection was closed');
					break;
				case 'ER_CON_COUNT_ERROR':
					console.error('Database has too many connections');
					break;
				case 'ECONNREFUSED':
					console.error('Couldn\'t connect to database ' + db_database + ' on ' + db_host);
					break;
				default:
					console.error("Unknown database error '" + err.code + "' ocurred.");
			}
			return;
		}
		
		if (connection) connection.release();
		console.log("Connected to database on " + db_host + ".");
		
		
		const Auth = require('./server_src/auth.js');
		let myauth = new Auth(srv, db);
		
		// Setup the custom routes we need
		const Post = require('./server_src/post.js');
		let mypost = new Post(srv, db, myauth);
		const Account = require('./server_src/account.js');
		let account = new Account(srv, db, myauth);
		
		
		srv.use(express.static(path.resolve(__dirname, "../"))); // Host static files from the distribution (i.e. compiled) directory
		//*/ DISABLED 1.1a
		srv.get("/*", handleRender);
		//--1.1a */
		
		// Start listening on the webserver
		srv.listen(port, hostname, () => console.log("Listening on '" + hostname + ':' + port + "'") );
	})
	
	
	//*/ DISABLED 1.1a
	async function handleRender(req, res) {
		console.log("Handling render...");
		
		
		const store = createAppStore();
		await manuallyInitialiseStore(store, db);
		const context = {};
		
		const html = renderToString(
									<Provider store={store}>
										<StaticRouter location={req.url} context={context}>
											<App />
										</StaticRouter>
									</Provider>
								);
		
		const preloadedState = store.getState();
		res.send(renderFullPage(html, preloadedState));
	}
	
	
	function renderFullPage(html, preloadedState) {
		return `
			<!doctype html>
			<html>
				<head>
					<meta charset="utf8" />
					<title>Redux Universal Example</title>
					
					<link rel="stylesheet" href="./index.css">
				</head>
				<body>
					<span id="root">${html}</span>
					<script>
						// WARNING: See the following for security issues around embedding JSON in HTML:
						// http://redux.js.org/recipes/ServerRendering.html#security-considerations
						window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
							/</g,
							'\\u003c'
						)}
					</script>
					<script src="./bundle.js"></script>
				</body>
			</html>
		`;
	}
	//--1.1a */
