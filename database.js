// Database API (MongoDB Client)

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

//Local database variable
var db_petme;

// Database Connection
var url = 'mongodb://localhost:5400/petme_db';

MongoClient.connect(url, function(err, db) {
    db_petme = db;
    console.log("Loaded database to local variable.");
    assert.equal(null, err);
    console.log("Connected correctly to server.");
});

exports.getDatabase = function() {
    return db_petme;
};


var getAdoptionPosts_impl1 = function(db, callback) {
    db.collection('adoptionPosts').find().toArray(function(err, documents) {
        callback(documents);
    });
}

var getAdoptionPosts_impl2 = function(db, query, callback) {
    db.collection('adoptionPosts').find(query).toArray(function(err, documents) {
        callback(documents);
    });
}

exports.getAdoptionPosts = function(db, callback, query) {
    if(arguments.length == 2) {
        return getAdoptionPosts_impl1(db, callback);
    } else {
        return getAdoptionPosts_impl2(db, query, callback);
    }
}

var getEvents_impl1 = function(db, callback) {
    db.collection('events').find().toArray(function(err, documents) {
        callback(documents);
    });
}

var getEvents_impl2 = function(db, query, callback) {
    db.collection('events').find(query).toArray(function(err, documents) {
        callback(documents);
    });
}

exports.getEvents = function(db, callback, query) {
    if(arguments.length == 2) {
        return getEvents_impl1(db, callback);
    } else {
        return getEvents_impl2(db, query, callback);
    }
}

exports.getEventByID = function(db, id, query) {
    db.collection('events').findOne( { _id: id }, { _id: 0 }, (function(err, document) {
        callback(document);
    }));
}

exports.getPosts = function(db, callback) {
    db.collection('posts').find().toArray(function(err, documents) {
        callback(documents);
    });
}

exports.getPostByID = function(db, id, callback) {
    db.collection('posts').findOne({ _id: id }, function(err, document) {
        callback(document);
    });
}

exports.getUserByID = function(db, id, callback) {
    db.collection('users').findOne( { _id : id }, { _id : 0, password : 0 } , function(err, document) {
        callback(document);
    });
}

exports.validateUser = function(db, username, password, callback) {
    db.collection('users').findOne( { username : username, password : password }, { password : 0 } , function(err, document) {
        callback(document);
    });
}

exports.getCommentByID = function(db, id, callback) {
    db.collection('comments').findOne({ _id: id }, function(err, document) {
        callback(document);
    });
}

exports.addParticipant = function(db, event_id, participant_id, callback) {
    exports.getEventByID(db, +event_id, function (event) {
        participants_array = event.participants;
        participants_array.push(+participant_id);
        db.collection('events').updateOne(
            { _id : +event_id },
            {
                $set: { "participants": participants_array }
            }, function(err, results) {
            callback(results);
        });
    });
}

exports.deleteParticipant = function(db, event_id, participant_id, callback) {
    exports.getEventByID(db, +event_id, function (event) {
        participants_array = event.participants;
        participants_array.splice(participants_array.indexOf(+participant_id), 1);
        db.collection('events').updateOne(
            { _id : +event_id },
            {
                $set: { "participants": participants_array }
            }, function(err, results) {
            callback(results);
        });
    });
}

exports.getParticipants = function(db, event_id, participant_ids, callback) {
    exports.getEventByID(db, +event_id, function(event) {
        // Checks if the user_ids array sent is in the current array of the friends of the user
        participant_array = user.participants;
        if (participant_ids.length == 0) {
            participant_ids = participant_array;
        } else {
            participant_ids_temp = participant_ids;
            for (id in participant_ids) {
                id = participant_ids[id];
                if (participant_array.indexOf(id) < 0) {
                    participant_ids_temp.splice(participant_ids_temp.indexOf(id), 1);
                }
            }
            participant_ids = participant_ids_temp;
        }
        exports.getUsers(db, { _id: { $in: participant_ids} }, function(users) {
            callback(users);
        });
    });
}

exports.addFriend = function(db, user_id, friend_id, callback) {
    exports.getUserByID(db, user_id, function (user) {
        friends_array = user.friends;
        friends_array.push(friend_id);
        db.collection('users').updateOne(
            { _id : +user_id },
            {
                $set: { "friends": friends_array }
            }, function(err, results) {
            callback(results);
        });
    });
}


exports.deleteFriend = function(db, user_id, friend_id, callback) {
    exports.getUserByID(db, +user_id, function (user) {
        friends_array = user.friends;
        friends_array.splice(friends_array.indexOf(friend_id), 1);
        db.collection('users').updateOne(
            { _id : +user_id },
            {
                $set: { "friends": friends_array }
            }, function(err, results) {
            callback(results);
        });
    });
}

exports.getFriends = function(db, user_id, user_ids, callback) {
    exports.getUserByID(db, +user_id, function(user) {
        // Checks if the user_ids array sent is in the current array of the friends of the user
        friends_array = user.friends;
        if (user_ids.length == 0) {
            user_ids = friends_array;
        } else {
            user_ids_temp = user_ids;
            for (id in user_ids) {
                id = user_ids[id];
                if (friends_array.indexOf(id) < 0) {
                    user_ids_temp.splice(user_ids_temp.indexOf(id), 1);
                }
            }
            user_ids = user_ids_temp;
        }
        exports.getUsers(db, { _id: { $in: user_ids} }, function(users) {
            callback(users);
        });
    });
}

exports.getUsers = function (db, query, callback) {
    db.collection('users').find(query).toArray(function(err, results){
        callback(results); // output all records
    });
}

exports.createEvent = function (db, event, callback) {
    var newEvent = {
        organization: event.organization,
        title: event.title,
        description: event.description,
        date: event.date,
        pictures: event.pictures,
        attendUsers: [],
        participants: []
    };
    try {
        db.collection('events').insertOne(newEvent);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}