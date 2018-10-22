'use strict';

const express = require('express');
const mysql = require('mysql');
const path = require('path');

const hostname = '0.0.0.0';
const port = 8080;


let app = express();
app.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);



function get_tabs(req, res, next) {
	var tabs = [];
	con.query("SELECT tabname FROM tabs WHERE tabname like ?", [ req.params.query || '%' ], function(err, result, fields) {
		if (err) throw err;
	
		for(var i = 0; i < result.length; i++) {
			tabs.push(result[i].tabname);
		}
		
		
		res.send({ query : req.params.query,
					tabs : tabs
				});
		next();
	});
}


function add_tab(req, res, next) {
	con.query("INSERT INTO tabs (tabname) VALUES (?)", [ req.params.name ], function(err, result, fields) {
		res.send("Added '" + req.params.name + "' to tabs.");
		next();
	});
}



app.get('/add/:name', add_tab);
app.get('/tabs/:query', get_tabs);
app.get('/tabs/', get_tabs);
app.get('/home/:name', function(req, res, next) {
						let file = req.params.name;
						file = path.join(__dirname, 'dist', file);
						res.sendFile(file);
						console.log("Served " + file);
					}
			);

var con = mysql.createConnection({
  host: "sql2.freemysqlhosting.net",
  user: "sql2262231",
  password: "eS8!fE8*",
  database: "sql2262231",
});

app.listen(port, hostname, function() {
	console.log("Listening on '" + hostname + ':' + port + "'");
	
	console.log("Connecting to database...");
	con.connect(function(err) {
		if (err) throw err;
		
		console.log("Connected to database.");
	});
});
