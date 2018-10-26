'use strict';

// GLOBAL CONFIG
const hostname = process.env.srv_addr || '0.0.0.0';
const port = process.env.srv_port || 8088;

const db_connLimit = 10;
const db_host     = process.env.db_host || '127.0.0.1';
const db_database = process.env.db_database || 'portfolio';
const db_username = process.env.db_username || 'root';
const db_password = process.env.db_password || 'password';

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');



// Setup the Webserver
	let app = express();
	
	// Turn incoming json in the request body into a useable hash
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	// Enable CORS stuff -- probably not needed in production, but for my dev env
	//					   this hosts RESTful stuff and webpackage hosts the react/redux stuff
	app.use(
	  function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "content-type");
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		return next();
	  }
	);
	
	// Host static files from the distribution (i.e. compiled) directory
	app.get('/home/:name', function(req, res, next) {
							let file = path.join(__dirname, 'dist', req.params.name);
							res.sendFile(file);
							console.log("Served " + file);
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
					console.error('Couldn\'t connect to database');
					break;
				default:
					console.error("Unknown database error '" + err.code + "' ocurred.");
			}
		}
		
		if (connection) connection.release();
		console.log("Connected to database on " + db_host + ".");
		
		
		// Setup the custom routes we need
		const Post = require('./server_code/posts.js');
		let mypost = new Post(app, db);
		
		// Start listening on the webserver
		app.listen(port, hostname, () => console.log("Listening on '" + hostname + ':' + port + "'") );
	})
