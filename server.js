/*Initialization*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database.js');


/*Configuration*/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));


/*Helpful Methods*/
var check = function (res, object, message) {
    var result = (object !== undefined);
    if (!result) {
        res.status(500).send(message + 'provided is undefined');
    }
    return result;
};


/*Users*/
/**
 * @summary Get an Specific User Request
 * @type GET Method
 * @route /api/users/an_id
 * @route /api/users/an_email
 * @body {name: 'a_user', email: 'an_email', password: 'a_password'}
 * @returns The specified user info
 * @returns Nothing if did not find the user
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/users/:id', function (req, res) {
    database.getUserByID(database.getDatabase(), req.params.id, function (document) {
        res.send(JSON.stringify(document));
        /*if(err){
            res.status(500).send('Problem while trying to signing up');
        }*/
    });
});

/**
 * @summary Create a new User Request
 * @type POST Method
 * @route /api/users/signup
 * @body {name: 'a_user', email: 'an_email', password: 'a_password'}
 * @returns A 202 status meaning there was no problem
 * @returns A 500 status meaning there was a problem
 *
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.post('/api/users/signup', function (req, res) {
    database.createUser(database.getDatabase(), req.body, function (document) {
        res.send(JSON.stringify(document));
        //if(err){
        //    res.status(500).send('Problem while trying to signing up');
        //}
    });
});

/**
 * @summary Login with an specified email & password Request
 * @type POST Method
 * @route /api/users/login
 * @body {email: 'an_email', password: 'a_password'}
 * @body {id: 'an_id', password: 'a_password'}
 * @returns The user info if validation passed
 * @returns Nothing if validation did not pass
 * @returns A 500 status meaning there was a problem
 *
 * @todo Change implementation from username to email
 * @todo Add implementation to check with user ID
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.post('/api/users/login', function (req, res) {
    database.validateUser(database.getDatabase(), req.body.username, req.body.password, function (document) {
        res.send(JSON.stringify(document));
    });
});

/**
 * @summary Get users based in a Query Request
 * @type GET Method
 * @route /api/users?usersID=[an_id, another_id]
 * @route /api/users?usersEmail=[an_email, another_email]
 * @route /api/users?name="Juan"&age="18"
 * @route /api/users?name="Juan"&usersID=[an_id, another_id]
 * @returns The users info based on the Query
 * @returns Nothing if did not find any users
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Implement special queries
 * @todo Implement queries with array users
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/users?', function (req, res) {
    if (req.query.users != undefined) {
        if (req.query.users != undefined) {
            users = req.query.users;
            users = users.replace('[', '');
            users = users.replace(']', '');
            users = users.split(",");
            /*for (user in users) {
                users[user] = +users[user];
            }*/
            database.getUsers(database.getDatabase(), { _id: { $in: users } }, function (documents) {
                res.send(documents);
                //if(err){
                //    res.status(500).send('Problem while trying to signing up');
                //}
            });
        }
    } else {
        database.getUsers(database.getDatabase(), {}, function (documents) {
            res.send(documents);
            /*if(err){
                res.status(500).send('Problem while trying to signing up');
            }*/
        });
    }
});

/**
 * @summary Add a User to the List of Friends of Another User Request
 * @type POST Method
 * @route /api/users/an_id/friends/another_ID/add
 * @route /api/users/an_email/friends/enother_email/add
 * @returns A 202 status meaning there was no problem
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Do not let add himself/herself as friend
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.post('/api/users/:userID/friends/:friendID/add', function (req, res) {
    database.addFriend(database.getDatabase(), req.params.userID, req.params.friendID, function (result) {
        res.send(result);
    });
});

/**
 * @summary Add a User to the List of Friends of Another User Request
 * @type POST Method
 * @route /api/users/an_id/friends/another_ID/add
 * @route /api/users/an_email/friends/enother_email/add
 * @body {id: 'an_id', user_id: 'another_id'}
 * @body {email: 'an_email', user_email: 'another_email'}
 * @returns A 202 status meaning there was no problem
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Do not let add himself/herself as friend
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.post('/api/users/friends/add?', function (req, res) {
    if (req.query.id != undefined) {
        id = req.query.id;
        user_id = req.query.user_id;
        database.addFriend(database.getDatabase(), id, user_id, function (result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a friend undefined.");
    }
});

/**
 * @summary Delete a User from the List of Friends of Another User Request
 * @type Delete Method
 * @route /api/users/an_id/friends/another_ID/delete
 * @route /api/users/an_email/friends/enother_email/delete
 * @returns A 202 status meaning there was no problem
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.delete('/api/users/:id/friends/:user_id/delete', function (req, res) {
    if (req.params.id != undefined && req.params.user_id != undefined) {
        var id = req.params.id;
        var user_id = req.params.user_id;
        database.deleteFriend(database.getDatabase(), id, user_id, function (result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a friend undefined.");
    }
});

/**
 * @summary Delete a User from the List of Friends of Another User Request
 * @type Delete Method
 * @route /api/users/friends/delete?
 * @body {id: 'an_id', user_id: 'another_id'}
 * @body {email: 'an_email', user_email: 'another_email'}
 * @returns A 202 status meaning there was no problem
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.delete('/api/users/friends/delete?', function (req, res) {
    if (req.query.id != undefined && req.query.user_id != undefined) {
        id = req.query.id;
        user_id = req.query.user_id;
        database.deleteFriend(database.getDatabase(), id, user_id, function (result) {
            res.send(result);
        });
    } else {
        res.send("User query to add as a friend undefined.");
    }
});

/**
 * @summary Get Friends from a User Request
 * @type GET Method
 * @route /api/users/an_id/friends
 * @route /api/users/an_email/friends
 * @returns The List of Friends Info
 * @returns Nothing if no friends where found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.get('/api/users/:id/friends', function (req, res) {
    if (req.params.id != undefined) {
        var id = req.params.id;
        database.getFriends(database.getDatabase(), id, [], function (result) {
            res.send(result);
        });
    } else {
        res.send("Id or email is undefined");
    }
});

/**
 * @summary Get Friends from a User and a Query Request
 * @type GET Method
 * @route /api/users/friends?id=an_id
 * @route /api/users/friends?email=an_email
 * @route /api/users/friends?id=an_id&name="Juan"
 * @returns The List of Friends Info
 * @returns Nothing if no friends where found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Implement Query
 * @todo Add Authorization
 */
app.get('/api/users/friends?', function (req, res) {
    if (req.query.id != undefined) {
        var id = req.query.id;
        var name = req.query.name;
        database.getFriends(database.getDatabase(), id, [], function (result) {
            res.send(result);
        });
    } else {
        res.send("No User ID supplied.");
    }
});


/*Posts*/
/**
 * @summary Get An Specified Post Request
 * @type GET Method
 * @route /api/posts/an_id
 * @route /api/posts/an_email
 * @returns The Specified Post
 * @returns Nothing if specified post was not found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/posts/:id', function (req, res) {
    var id = req.params.id;
    database.getPostByID(database.getDatabase(), id, function (element) {
        post = element;
        res.send(JSON.stringify(post));
    });
});

/**
 * @summary Get Posts based on Query Request
 * @type GET Method
 * @route /api/posts?id=an_id
 * @route /api/posts?hashtag=cool&user=an_id
 * @returns The Specified Post
 * @returns Nothing if specified post was not found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement Query
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/posts?', function (req, res) {
    database.getPosts(database.getDatabase(), function (documents) {
        res.send(JSON.stringify(documents));
    });
});


/*Adoptions*/
/**
 * @summary Create a new Adoption Request
 * @type GET Method
 * @route /api/adoptionPosts/create
 * @body {pet: a_pet, pictures: some_pictures, hashtags: some_hashtags}
 * @returns A 202 status meaning it created it
 * @returns A 500 status meaning there was a problem
 *
 * @todo Check for Errors
 * @todo Add Authorization
 */
app.post('/api/adoptionPosts/create', function (req, res) {
    var newAdoption = req.body;
    if (check(res, newAdoption, 'Adoption')) {
        database.createAdoption(database.getDatabase(), newAdoption, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.delete('/api/adoptionPosts/delete/:adoptionID', function (req, res) {
    var adoptionID = req.params.adoptionID;
    if (check(res, adoptionID, 'Adoption ID')) {
        database.deleteAdoption(database.getDatabase(), adoptionID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.put('/api/adoptionPosts/edit/:adoptionID', function (req, res) {
    var adoptionID = req.params.adoptionID;
    if (check(res, adoptionID, 'Adoption ID')) {
        database.editAdoption(database.getDatabase(), adoptionID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

/**
 * @summary Get Specified Adoption Request
 * @type GET Method
 * @route /api/adoptionPosts/an_id
 * @route /api/adoptionPosts/an_email
 * @returns The Specified Adoption
 * @returns Nothing if specified adoption was not found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement pass email
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/adoptionPosts/:adoptionID', function (req, res) {
    var adoptionID = req.params.adoptionID;
    if (check(res, adoptionID, 'Adoption ID')) {
        database.getAdoptionPosts(database.getDatabase(), { _id: adoptionID }, function (adoption) {
            res.send(JSON.stringify(adoption));
        });
    }
});

/**
 * @summary Get Adoptions Based on a Query Request
 * @type GET Method
 * @route /api/adoptionPosts?id=an_id
 * @route /api/adoptionPosts?age=1&breed=beagle
 * @returns The Adoptions found
 * @returns Nothing if no adoptions where found
 * @returns A 500 status meaning there was a problem
 *
 * @todo Implement Query
 * @todo Check for Errors
 * @todo Add Authorization
 * @todo Implement for both with and without Authorization
 */
app.get('/api/adoptionPosts?', function (req, res) {
    var adoptionQuery = req.query;
    if (check(res, adoptionQuery, 'Adoption Query')) {
        var breed = adoptionQuery.breed;
        if (breed) {
            database.getAdoptionPosts(database.getDatabase(), function (adoptions) {
                res.send(JSON.stringify(adoptions));
            }, { breed: breed });
        } else {
            database.getAdoptionPosts(database.getDatabase(), function (adoptions) {
                res.send(JSON.stringify(adoptions));
            });
        }
    }
});


/*Events*/
app.post('/api/events/create', function (req, res) {
    var newEvent = req.body;
    if (check(res, newEvent, 'Event')) {
        database.createEvent(database.getDatabase(), newEvent, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.delete('/api/events/delete/:eventID', function (req, res) {
    var eventID = req.params.eventID;
    if (check(res, eventID, 'Event ID')) {
        database.deleteEvent(database.getDatabase(), eventID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.put('/api/events/edit/:eventID', function (req, res) {
    var eventID = req.params.eventID;
    var newEvent = req.body;
    if (check(res, eventID, 'Event ID') && check(res, newEvent, 'Event')) {
        database.editEvent(database.getDatabase(), eventID, newEvent, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.get('/api/events/:eventID', function (req, res) {
    var eventID = req.params.eventID;
    if (check(res, eventID, 'Event ID')) {
        database.getEvent(database.getDatabase(), eventID, function (event) {
            res.send(JSON.stringify(event));
        });
    }
});

app.get('/api/events?', function (req, res) {
    var event = req.query;
    if (check(res, event, 'Event Query')) {
        var title = event.title;
        if (title) {
            database.getEvents(database.getDatabase(), function (events) {
                res.send(JSON.stringify(events));
            }, { title: { $regex: title, $options: "si" } });
        } else {
            database.getEvents(database.getDatabase(), function (events) {
                res.send(JSON.stringify(events));
            });
        }
    }
});

app.put('/api/events/:eventID/attend/:userID', function (req, res) {
    var eventID = req.params.eventID;
    var userID = req.params.userID;
    if (check(res, eventID, 'Event ID') && check(res, userID, 'User ID')) {
        database.attendEvent(database.getDatabase(), eventID, userID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.put('/api/events/:eventID/unattend/:userID', function (req, res) {
    var eventID = req.params.eventID;
    var userID = req.params.userID;
    if (check(res, eventID, 'Event ID') && check(res, userID, 'User ID')) {
        database.unattendEvent(database.getDatabase(), eventID, userID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.get('/api/events/:eventID/attend/:userID', function (req, res) {
    var eventID = req.params.eventID;
    var userID = req.params.userID;
    if (check(res, eventID, 'Event ID') && check(res, userID, 'User ID')) {
        database.checkAttendEvent(database.getDatabase(), eventID, userID, function (isAttending) {
            res.send(isAttending);
        });
    }
});

app.post('/api/events/:eventID/invite', function (req, res) {
    var eventID = req.params.eventID;
    var userID = req.body.from;
    var invitations = req.body.to;
    if (check(res, eventID, 'Event ID') && check(res, userID, 'From User ID') && check(res, invitations, 'Invitations')) {
        database.sendInvitations(database.getDatabase(), eventID, userID, invitations, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.post('/api/events/:eventID/participants/add', function (req, res) {
    var eventID = req.params.eventID;
    var userID = req.query.userID;
    if (check(res, eventID, 'Event ID') && check(res, userID, 'User ID')) {
        database.addParticipant(database.getDatabase(), eventID, userID, function (confirmation) {
            res.send(confirmation);
        });
    }
});

app.delete('/api/events/:eventID/participants/delete/:userID', function (req, res) {
    var eventID = req.params.id;
    var userID = req.params.userID;

    if (check(res, eventID, 'Event ID') && check(res, userID, 'User ID')) {
        database.deleteParticipants(database.getDatabase(), id, userID, function (result) {
            res.send(result);
        });
    }
});

app.get('/api/events/:eventID/participants?', function (req, res) {
    var eventID = req.params.eventID;
    var query = res.query;
    if (check(res, eventID, 'Event ID') && check(res, query, 'Event Query')) {
        var users = query.users;
        if (users != undefined) {
            users = JSON.parse(users);
        }
        database.getParticipants(database.getDatabase(), id, users, function (result) {
            res.send(result);
        });
    }
});


/**Depricated */
/*
app.get('/api/users?', function (req, res) {
    var username = req.query.username;
    if (username) {
        database.getUser(database.getDatabase(), username, function (user) {
            res.send(user);
            //if (err) {
	        //   res.status(500).send('Error');
	        //}
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
            //if (err) {
	        //    res.status(500).send('Error');
	        //}
        });
    } else {
        res.status(500).send('Property ' + username + 'not found');
    }
});
*/


/*Connect Server*/
app.listen(8100, function () {
    console.log('Ready');
});