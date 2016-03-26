var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

app.get('/api/adoptionPosts?', function (req, res) {
	var breed = req.query.breed;
	var data = [];
	if(breed){
        database.getAdoptionPosts(database.getDatabase(), function(documents) {
            data = documents;
            res.send(JSON.stringify(data));
        }, { breed: breed });
	} else {
        database.getAdoptionPosts(database.getDatabase(), function(documents) {
            data = documents;
            res.send(JSON.stringify(data));
        });
	}
});

app.get('/api/posts?', function (req, res) {
    var data = [];
    database.getPosts(database.getDatabase(), function(documents) {
        data = documents;
        posts = documents;
        res.send(JSON.stringify(data));
    });
});

app.get('/api/adoptionPosts/:id', function (req, res) {
	database.getAdoptionPosts(database.getDatabase(), { _id: +req.params.id}, function(documents) {
        data = documents[0];
        res.send(JSON.stringify(data));
    });
});

app.get('/api/posts/:id', function (req, res) {
    var post;
    database.getPostByID(database.getDatabase(), +req.params.id, function(element) {
        post = element;
        res.send(JSON.stringify(post));
    });
});

app.get('/api/events?', function (req, res) {
	var title = req.query.title;
    var data = [];
    if(title){
        database.getEvents(database.getDatabase(), function(documents) {
            data = documents;
            res.send(JSON.stringify(data));
        }, { title: title });
    } else {
        database.getEvents(database.getDatabase(), function(documents) {
            data = documents;
            res.send(JSON.stringify(data));
        });
    }
});

app.get('/api/events/:id', function (req, res) {
	var data = []
    database.getEvents(database.getDatabase(), function(document) {
        res.send(JSON.stringify(document));
    }, { _id: req.params.id });
});

app.get('/api/users/:id', function (req, res) {
	var data = []
    database.getUserByID(database.getDatabase(), +req.params.id, function(document) {
        res.send(JSON.stringify(document));
    });
});

app.get('/api/users?', function(req, res){
	var username = req.query.username;
	if(username){
		var flag = true;
		for(var i=0; i < users.length; i++){
			if(users[i].username.toLowerCase() === username.toLowerCase()){
				res.send(users[i]);
				flag = false;
				break;
			}
		}
		if(flag) res.send(undefined);
	}else{
		res.status(500).send('Property '+ username + 'not found');
	}
});

app.post('/api/login', function(req, res) {
    database.validateUser(database.getDatabase(), req.body.username, req.body.password, function(document) {
        res.send(JSON.stringify(document));
    });
});

app.listen(8100, function () {
  console.log('Ready');
});


var adoptionPosts = [];

var posts = [];

var events = [];