// Database API (MongoDB Client)

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

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

//Function to generate a new hash for a password
var generateHash = function (plainPassword) {
    var hashedPassword = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(9));
    return hashedPassword;
};
//Function to check if a hashed password matches a plain password
var validPassword = function (plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
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
    db.collection('events').find(query).toArray(function (err, documents) {
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

exports.getEvent = function (db, id, callback) {
    db.collection('events').findOne({ _id: new ObjectId(id) }, function (err, document) {
        callback(document);
    });
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

exports.getUser = function (db, username, callback) {
    db.collection('users').findOne({ username: username }, { _id: 0, password: 0 }, function (err, document) {
        callback(document);
    });
}

exports.getUsers = function (db, array, callback) {
    db.collection('users').find({ _id: { $in: array } }, { _id: 0, password: 0 }, function (err, document) {
        callback(document);
    });
}

exports.attendEvent = function (db, eventID, userID, callback) {
    db.collection('events').update({ _id: new ObjectId(eventID) }, { $addToSet: { attendUsers: new ObjectId(userID) } }, function (err, document) {
        callback(document);
    });
}

exports.unattendEvent = function (db, eventID, userID, callback) {
    db.collection('events').update({ _id: new ObjectId(eventID) }, { $pull: { attendUsers: new ObjectId(userID) } }, function (err, document) {
        callback(document);
    });
}

exports.checkAttendEvent = function (db, eventID, userID, callback) {
    db.collection('events').findOne({ _id: new ObjectId(eventID), attendUsers: { $elemMatch: { $eq: ObjectId(userID) } } }, { _id: 0, password: 0 }, function (err, document) {
        callback(document);
    });
}

exports.sendInvitations = function (db, eventID, username, invitations, callback) {
    var la = username + 'invites you to attend to the event: ' + eventID
    for (var i = 0; i < invitations.length; i++) {
        db.collection('event').updateOne({ _id: invitations[0] }, { $push: { invitations: { from: userID, event: eventID } } }, function (err, document) {
            callback(document);
        });
    };
}

exports.validateUser = function(db, username, password, callback) {
    db.collection('users').findOne({ username: username }, function (err, user) {
        if (user && validPassword(password, user.password)){
            callback(user);
        }
    });
}

exports.createUser = function (db, user, callback) {
    var hashedPassword = generateHash(user.password);
    var newUser = {
        username: user.username,
        name: user.name,
        email: user.email,
        password: hashedPassword
    }
    try {
        db.collection('users').insertOne(newUser);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

exports.createEvent = function (db, event, callback) {
    var newEvent = {
        organization: event.organization,
        title: event.title,
        description: event.description,
        date: event.date,
        pictures: event.pictures,
        attendUsers: []
    };
    try {
        db.collection('events').insertOne(newEvent);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.createAdoption = function (db, adoption, callback) {
    var adoptionPost = {
        pet: adoption.pet,
        pictures: adoption.pictures,
        hashtags: adoption.hashtags
    };
    try {
        db.collection('adoptions').insertOne(newAdoption);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.getCommentByID = function(db, id, callback) {
    db.collection('comments').findOne({ _id: id }, function(err, document) {
        callback(document);
    });
}