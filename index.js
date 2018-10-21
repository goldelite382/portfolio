'use strict';

const http = require('http');
const restify = require('restify');
//const mongoose = require('mongoose');
const mysql = require('mysql');

const hostname = '0.0.0.0';
const port = 8080;

//mongoose.connect('mongodb://localhost/test', { useNewUrlParser : true });
//server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });
var server = restify.createServer();

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);




//var Kitten;

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


server.get('/add/:name', add_tab);
server.get('/tabs/:query', get_tabs);
server.get('/tabs/', get_tabs);

var con = mysql.createConnection({
  host: "sql2.freemysqlhosting.net",
  user: "sql2262231",
  password: "eS8!fE8*",
  database: "sql2262231",
});

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function() {
	server.listen(port, hostname, function() {
		console.log("Listening on '" + hostname + ':' + port + "'");
		
		console.log("Connecting to database...");
		con.connect(function(err) {
			if (err) throw err;
			
			console.log("Connected to database.");
		});
	});
	
//	var kittySchema = new mongoose.Schema({
//		name: String
//	});
	
//	Kitten = mongoose.model('Kitten', kittySchema);
//});




/*
module.exports = function(app) {
  //var todoList = require('../controllers/todoListController');

  // todoList Routes
  server.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  server.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
*/



	//*/
