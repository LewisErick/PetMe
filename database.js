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

exports.addParticipant = function(db, event_id, user_id, callback) {
    getEvent(db, +event_id, function (event) {
        participants_array = event.participants;
        participants_array.push(user_id)
        db.collection('events').updateOne(
            { _id : +event_id },
            {
                $set: { "participants": participants_array }
            }, function(err, results) {
                callback(results);
            }
        );
    });
}

exports.deleteParticipant = function(db, event_id, user_id, callback) {
    getEvent(db, +event_id, function (event) {
        participants_array = event.participants;
        participants_array.splice(participants_array.findIndex(user_id), 1);
        db.collection('events').updateOne(
            { _id : +event_id },
            {
                $set: { "participants": participants_array }
            }, function(err, results) {
                callback(results);
            }
        );
    });
}

exports.getParticipants = function(db, event_id, user_ids, callback) {
    getEvent(db, event_id, function(event) {
        // Checks if the user_ids array sent is in the current array of the participants of the event
        participants_array = event.participants;
        if (users_ids == null || user_ids == []) {
            user_ids = participants_array
        } else {
            user_ids_temp = user_ids
            for (id in user_ids) {
                if (participants_array.findIndex(id) < 0) {
                    user_ids_temp.splice(user_ids_temp.findIndex(id), 1);
                }
            }
            user_ids = user_ids_temp
        }
        getUsers(db, { _id: { $in: user_ids} }, function(users) {
            callback(users);
        });
    });
}

exports.addFriend = function(db, user_id, friend_id, callback) {
    getUserByID(db, +user_id, function (err, user) {
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
    getUserByID(db, +user_id, function (err, user) {
        friends_array = user.friends;
        friends_array.splice(friends_array.findIndex(+friend_id), 1);
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
    getUserByID(db, +user_id, function(user) {
        // Checks if the user_ids array sent is in the current array of the friends of the user
        friends_array = user.friends;
        if (users_ids == [] || user_ids == null) {
            user_ids = friends_array;
        } else {
            user_ids_temp = user_ids;
            for (id in user_ids) {
                if (friends_array.findIndex(id) < 0) {
                    user_ids_temp.splice(user_ids_temp.findIndex(id), 1);
                }
            }
            user_ids = user_ids_temp;
        }
        getUsers(db, { _id: { $in: user_ids} }, function(users) {
            callback(users);
        });
    });
}

exports.getUsers = function (db, query, callback) {
    db.collection('users').find( { _id: { $in : [new ObjectID(1),new ObjectID(2)] } }, function(documents) {
        console.log(documents);
        callback(documents);
    });
    //db.collection('users').find({_id:{$in:[1,2]}}, { _id: 0, password: 0 }, function (document) {
    //    console.log(document);
    //    callback(document);
    //});
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