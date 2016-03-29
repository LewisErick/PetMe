/*Initialization*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database.js');


/*Configuration*/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));


/*Users*/
app.get('/api/users/:id', function (req, res) {
    database.getUserByID(database.getDatabase(), req.params.id, function (document) {
        res.send(JSON.stringify(document));
        /*if(err){
            res.status(500).send('Problem while trying to signing up');
        }*/
    });
});

app.get('/api/users?', function (req, res) {
    var username = req.query.username;
    if (username) {
        database.getUser(database.getDatabase(), username, function (user) {
            res.send(user);
            /*if (err) {
	            res.status(500).send('Error');
	        }*/
        });
    } else {
        res.status(500).send('Property ' + username + 'not found');
    }
});

app.get('/api/users/multi?', function (req, res) {
    var ids = req.query.id;
    if (ids) {
        database.getUsers(database.getDatabase(), username, function (user) {
            res.send(user);
            /*if (err) {
	            res.status(500).send('Error');
	        }*/
        });
    } else {
        res.status(500).send('Property ' + username + 'not found');
    }
});

app.post('/api/users/signup', function (req, res) {
    database.createUser(database.getDatabase(), req.body, function (document) {
        res.send(JSON.stringify(document));
        /*if(err){
            res.status(500).send('Problem while trying to signing up');
        }*/
    });
});

app.post('/api/users/login', function (req, res) {
    database.validateUser(database.getDatabase(), req.body.username, req.body.password, function (document) {
        res.send(JSON.stringify(document));
    });
});


/*Posts*/
app.get('/api/posts/:id', function (req, res) {
    var post;
    database.getPostByID(database.getDatabase(), +req.params.id, function (element) {
        post = element;
        res.send(JSON.stringify(post));
    });
});

app.get('/api/posts?', function (req, res) {
    database.getPosts(database.getDatabase(), function (documents) {
        res.send(JSON.stringify(documents));
    });
});


/*Adoptions*/
app.get('/api/adoptionPosts/:id', function (req, res) {
    database.getAdoptionPosts(database.getDatabase(), { _id: +req.params.id }, function (documents) {
        data = documents[0];
        res.send(JSON.stringify(data));
    });
});

app.get('/api/adoptionPosts?', function (req, res) {
    var breed = req.query.breed;
    var data = [];
    if (breed) {
        database.getAdoptionPosts(database.getDatabase(), function (documents) {
            data = documents;
            res.send(JSON.stringify(data));
        }, { breed: breed });
    } else {
        database.getAdoptionPosts(database.getDatabase(), function (documents) {
            data = documents;
            res.send(JSON.stringify(data));
        });
    }
});

app.post('/api/adoptions/create', function (req, res) {
    database.createAdoption(database.getDatabase(), req.body, function (event) {
        res.send(event);
        /*if(err){
            res.status(500).send('Error');
        }*/
    });
});


/*Events*/
app.get('/api/events/:id', function (req, res) {
    database.getEvent(database.getDatabase(), req.params.id, function (document) {
        res.send(JSON.stringify(document));
    });
});

app.get('/api/events?', function (req, res) {
    var title = req.query.title;
    var data = [];
    if (title) {
        database.getEvents(database.getDatabase(), function (documents) {
            data = documents;
            res.send(JSON.stringify(data));
        }, { title: { $regex: title, $options: "si" } });
    } else {
        database.getEvents(database.getDatabase(), function (documents) {
            data = documents;
            res.send(JSON.stringify(data));
        });
    }
});

app.post('/api/events/:eventID/attend/:userID', function (req, res) {
    database.attendEvent(database.getDatabase(), req.params.eventID, req.params.userID, function (document) {
        res.send(document);
        //if(err){
        //   res.status(500).send('Error');
        //}
    });
});

app.post('/api/events/:eventID/unattend/:userID', function (req, res) {
    database.unattendEvent(database.getDatabase(), req.params.eventID, req.params.userID, function (document) {
        res.send(document);
        /*if(err){
            res.status(500).send('Error');
        }*/
    });
});

app.get('/api/events/:eventID/attend/:userID', function (req, res) {
    database.checkAttendEvent(database.getDatabase(), req.params.eventID, req.params.userID, function (document) {
        res.send(document);
        //if(err){
        //   res.status(500).send('Error');
        //}
    });
});

app.post('/api/events/:eventID/invite', function (req, res) {
    var eventID = req.params.eventID;
    var username = req.body.from;
    var invitations = req.body.to;

    database.sendInvitations(database.getDatabase(), eventID, username, invitations, function (documents) {
        res.send(document);
        /*if(err){
            res.status(500).send('Error');
        }*/
    });
});

app.post('/api/events/create', function (req, res) {

    database.createEvent(database.getDatabase(), req.body, function (event) {
        res.send(event);
        /*if(err){
            res.status(500).send('Error');
        }*/
    });
});


/*Connect Server*/
app.listen(8100, function () {
    console.log('Ready');
});