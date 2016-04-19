app.factory('api', function($rootScope, $http, $ionicLoading, $window){
    var base = '';
    
    $rootScope.doRefresh = function (tab) {
        if(tab == 1)
            $rootScope.$broadcast('fetchAll');
        else
            $rootScope.$broadcast('fetchCompleted');
        $rootScope.$broadcast('scroll.refreshComplete');
    }
    
    var getAll = function (path) {
        return $http.get(base + '/api/' + path, {
            method: 'GET'
        });
    };
    
    var getSpecial = function (path, object) {
        var special = '';
        for (var key in object) {
            special += key + '=' + object[key] + '&';
        }
        special = special.slice(0, -1);
        return $http.get(base + '/api/' + path + '?' + special, {
            method: 'GET'
        });
    };
    
    var getById = function (path, id) {
        return $http.get(base + '/api/' + path + '/' + id, {
            method: 'GET'
        });
    };
    
    var getByArray = function (path, name, array) {
        return $http.get(base + '/api/' + path + '/?' + name + "=[" + array + "]", {
            method: 'GET'
        });
    };

    return {
        /*Users*/
        getUser: function (user) {
            return getById('users', user);
        },
        validateUser: function (username, password) {
            return $http.post('/api/users/login', { username: username, password: password });
        },
        createUser: function (user) {
            return $http.post('/api/users/signup', user);
        },
        getUsers: function (usersID){
            return getByArray('users', 'id', usersID);
        },
        getFriends: function(userID){
            return $http.get('api/users/' + userID  + '/friends');
        },
        /*Posts*/
        getPosts: function (number, search) {
            if (search) {
                return getSpecial('posts', { 'breed': search });
            } else {
                return getAll('posts');
            }
        },
        getPost: function (postID) {
            return getById('posts', postID);
        },
        createPost: function (img, hashtags, info, userKey) {
            var post = new Post(userKey, self.keyPost, img, hashtags, info);
            self.keyPost = self.keyPost + 1;
            console.log(post.key);
            self.posts.push(post);
            return post;
        },

        /*Adoptions*/
        getAdoptionPosts: function(number, search){
            if(search){
                return getSpecial('adoptionPosts', { 'breed': search });
            }else{
                return getAll('adoptionPosts');
            }
        },
        getAdoptionPost: function(adoptionID){
            return getById('adoptionPosts', adoptionID);
        },
        
        /*Events*/
        getEvents: function (number, search) {
            if(search){
                return getSpecial('events', { 'title': search });
            } else {
                return getAll('events');
            }
        },
        getEvent: function(eventID){
            return getById('events', eventID);
        },
        getAttendUsers: function (usersID) {
            return getByArray('users/multi', 'id', usersID);
        },
        checkAttendEvent: function(eventID, userID){
            return $http.get('api/events/' + eventID + '/attend/' + userID);
        },
        sendAttendConfirmation: function (eventID, userID, attend) {
            var attending = attend ? 'attend' : 'unattend';
            return $http.put('/api/events/' + eventID + '/' + attending + '/' + userID);
        },
        sendInivitationEvent: function (eventID, userID, users) {
            return $http.post('/api/events/' + eventID + '/invite', { 'from': userID, 'to': users });
        },
        createEvent: function (event) {
            return $http.post('api/events/create', event);
        },
        editEvent: function(eventID, newEvent){
            return $http.put('api/events/edit/' + eventID, newEvent);
        },
        deleteEvent: function(eventID){
            return $http.delete('api/events/delete/' + eventID);
        },

        /*Comments*/
		addComment: function(postKey, userKey, img, text) {
			var post = self.getPost(postKey);
			var user = self.getUser(userKey);
			var comment = new Comment(post, user, post.comments.length, img, text);
			post.comments.push(comment);
		}
	};
});
