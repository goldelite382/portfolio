'use strict';

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const sleep = require('sleep');

const hostname = '0.0.0.0';
const port = 8088;


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  function crossOrigin(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type"); //"X-Requested-With");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	return next();
  }
);



function getContent(req, res, next) {
	var tabs = [];
	
	sleep.sleep(1);
	
	console.log("Getting content");
	con.query("SELECT id, title FROM posts", function(err, result, fields) {
		if(err)	{ console.log(err); res.send({ error: err.sqlMessage || err }); }
		else		res.send({ result: result });
		next();
	});
}


function getSpecificContent(req, res, next) {
	console.log("Getting content for " + req.params.id);
	
	con.query("SELECT id, title, content FROM posts WHERE id=?", [ req.params.id ], function(err, result, fields) {
		if(err)	{ console.log(err); res.send({ error: err.sqlMessage || err }); }
		else		res.send({ result: result[0] });
		next();
	});
}

function createContent(req, res, next) {
	console.log("Creating content...");
	
	con.query("INSERT INTO posts (title, content) VALUES (?, ?)", [ req.body.title || '', req.body.content || '' ], function(err, result, fields) {
		if(err)	{ console.log(err); res.send({ error: err.sqlMessage || err }); next(); }
		else		{
			con.query("SELECT LAST_INSERT_ID() AS lii", function(err, result, fields) {
				if(err) { console.log(err); res.send({ error: err.sqlMessage || err }); }
				else		res.send({ result: result[0].lii });
				next();
			});
		}
	});
}

function updateContent(req, res, next) {
	con.query("UPDATE posts SET title=?, content=? WHERE id=?", [ req.body.title || '', req.body.content || '', req.body.id ], function(err, result, fields) {
		if(err)	{ console.log(err); res.send({ error: err.sqlMessage || err }); }
		else		res.send({ result: result[0] });
		next();
	});
}

function deleteContent(req, res, next) {
	con.query("DELETE FROM posts WHERE id=?", [ req.params.id ], function(err, result, fields) {
		if(err)	{ console.log(err); res.send({ error: err.sqlMessage || err }); }
		else		res.send({ result: "Success" });
		next();
	});
}


app.get('/content', getContent);
app.get('/content/:id', getSpecificContent);
app.post('/content/', createContent);
app.put('/content/', updateContent);
app.delete('/content/:id', deleteContent);


app.get('/home/:name', function(req, res, next) {
						let file = req.params.name;
						file = path.join(__dirname, 'dist', file);
						
						res.sendFile(file);
						
						console.log("Served " + file);
					}
			);

var con;
if(process.env.environment == 'openshift') {
	con = mysql.createConnection({
	  host: "sql2.freemysqlhosting.net",
	  user: "sql2262231",
	  password: "eS8!fE8*",
	  database: "sql2262231",
	});
} else {
	con = mysql.createConnection({
		host: "127.0.0.1",
		user: "root",
		password: 'password',
		database: 'portfolio',
	});
}

app.listen(port, hostname, function() {
	console.log("Listening on '" + hostname + ':' + port + "'");
	
	console.log("Connecting to database...");
	con.connect(function(err) {
		if (err) throw err;
		
		console.log("Connected to database.");
	});
});
