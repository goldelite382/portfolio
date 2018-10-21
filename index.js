'use strict';

const http = require('http');
const restify = require('restify');
//const mongoose = require('mongoose');
//const mysql = require('mysql');

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
	//if(!Kitten) console.error.bind(console, 'Not initialised');
	
	//var silence = new Kitten({ name: 'Silence' });
	//console.log(silence.name); // 'Silence'
	
	//Kitten.find({ name: new RegExp('^' + escapeRegExp(req.name)) }, function(results) {
	//	res.send(results);
	//});
	res.send("Got tabs for '" + req.name + "'!!");
	next();
}


function add_tab(req, res, next) {
	//if(!Kitten) console.error.bind(console, 'Not initialised');
	
	//var silence = new Kitten({ name: res.name });
	//console.log(silence.name);
	//res.send('Added ' + silence.name);
	res.send("Added '" + req.name + "' to tabs!!");
	next();
}


server.get('/add/:name', add_tab);
server.get('/tabs/:name', get_tabs);


//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function() {
	server.listen(port, hostname, function() {
		console.log("Listening");
	});
	
//	var kittySchema = new mongoose.Schema({
//		name: String
//	});
	
//	Kitten = mongoose.model('Kitten', kittySchema);
//});


/*
var con = mysql.createConnection({
  host: "172.27.93.115",
  user: "production",
  password: "production",
  database: "ecm",
});


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





console.log("Connecting...");
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	});
	
	console.log("Querying...");
	con.query("SELECT job_number FROM tracker3plus LIMIT 3", function (err, result, fields) {
		if (err) throw err;
		
		for(var i = 0; i < result.length; i++) {
			console.log(result[i].job_number);
		}
		console.log("Queried");
	});
	
	console.log("Finished");
	//*/
