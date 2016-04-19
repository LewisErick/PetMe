var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

app.get('/api/users/get?', function (req, res) {
    if (req.query.users != undefined || req.body.users != undefined) {
        if (req.query.users != undefined) {
            users = req.query.users;
            users = users.replace('[', '');
            users = users.replace(']', '');
            users = users.split(",");
            for (user in users) {
                users[user] = +users[user];
            }
        } else {
            users = req.body.users;
        }
        database.getUsers(database.getDatabase(), { _id: { $in: users } }, function (documents) {
            res.send(JSON.stringify(documents));
            /*if(err){
                res.status(500).send('Problem while trying to signing up');
            }*/
        });
    } else {
        database.getUsers(database.getDatabase(), {}, function (documents) {
            res.send(JSON.stringify(documents));
            /*if(err){
                res.status(500).send('Problem while trying to signing up');
            }*/
        });
    }
});

app.get('/api/friends/add?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
        user_id = +req.query.user_id;
    } else {
        id = req.body.id;
        user_id = req.body.user_id;
    }
    if (id != undefined || user_id != undefined) {
        database.addFriend(database.getDatabase(), id, user_id, function(result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a friend undefined.");
    }
});

app.get('/api/friends/del?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
        user_id = +req.query.user_id;
    } else {
        id = req.body.id;
        user_id = req.body.user_id;
    }
    if (id != undefined || user_id != undefined) {
        database.deleteFriend(database.getDatabase(), id, user_id, function(result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a friend undefined.");
    }
});

app.get('/api/friends?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
    } else {
        if (req.body.id != undefined) {
            id = req.body.id;
        } else {
            res.send("No User ID supplied.");
        }
    }
    if (req.query.users != undefined) {
        users = req.query.users;
        if (users != "[]") {
            users = users.replace('[', '');
            users = users.replace(']', '');
            users = users.split(",");
            for (user in users) {
                users[user] = +users[user];
            }
        } else {
            users = [];
        }
    } else {
        if (req.body.users != undefined) {
            users = req.body.users;
        } else {
            users = [];
        }
    }
    database.getFriends(database.getDatabase(), id, users, function(result) {
        res.send(result);
    });
});

app.get('/api/participants/add?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
        user_id = +req.query.user_id;
    } else {
        id = req.body.id;
        user_id = req.body.user_id;
    }
    if (id != undefined || user_id != undefined) {
        database.addParticipant(database.getDatabase(), id, user_id, function(result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a participant undefined.");
    }
});

app.get('/api/participants/del?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
        user_id = +req.query.user_id;
    } else {
        id = req.body.id;
        user_id = req.body.user_id;
    }
    if (id != undefined || user_id != undefined) {
        database.deleteParticipants(database.getDatabase(), id, user_id, function(result) {
            res.send(result);
        });
    } else {
        res.send("User query to delete a participant from event undefined.");
    }
});

app.get('/api/participants?', function (req, res) {
    if (req.query.id != undefined) {
        id = +req.query.id;
    } else {
        if (req.body.id != undefined) {
            id = req.body.id;
        } else {
            res.send("No User ID supplied.");
        }
    }
    if (req.query.users != undefined) {
        users = req.query.users;
        if (users != "[]") {
            users = users.replace('[', '');
            users = users.replace(']', '');
            users = users.split(",");
            for (user in users) {
                users[user] = +users[user];
            }
        } else {
            users = [];
        }
    } else {
        if (req.body.users != undefined) {
            users = req.body.users;
        } else {
            users = [];
        }
    }
    database.getParticipants(database.getDatabase(), id, users, function(result) {
        res.send(result);
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
		database.getUsers(database.getDatabase(), { username: username }, function (documents) {
            if (documents) {
                res.send(documents[0]);
            } else {
                console.log("User not found.");
            }
        });
	}else{
		console.log("User not found.");
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