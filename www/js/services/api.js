app.factory('api', function($rootScope, $http, $ionicLoading, $window){
    var base = '';
    
    $rootScope.doRefresh = function (tab) {
        if(tab == 1)
            $rootScope.$broadcast('fetchAll');
        else
            $rootScope.$broadcast('fetchCompleted');
        $rootScope.$broadcast('scroll.refreshComplete');
    }
    
    $rootScope.setToken = function (user) {
        //POST
        return $window.localStorage.user = user;
    }

    $rootScope.getToken = function () {
        return $window.localStorage.user;
    }

    $rootScope.isSessionActive = function () {
        return $window.localStorage.user ? true : false;
    }
    
    var getAll = function (path) {
        return $http.get(base + '/api/' + path, {
            method: 'GET'
        });
    };
    
    var getSpecial = function (path, name, value) {
        return $http.get(base + '/api/' + path + '/?' + name + '=' + value, {
            method: 'GET'
        });
    };
    
    var getById = function (path, id) {
        return $http.get(base + '/api/' + path + '/' + id, {
            method: 'GET'
        });
    };
    
    return {
        getAdoptionPosts: function(number, search){
            if(search){
                return getSpecial('adoptionPosts', 'breed', search);
            }else{
                return getAll('adoptionPosts');
            }
        },
        getAdoptionPost: function(id){
            return getById('adoptionPosts',id);
        },
        getPosts: function(number, search){
            if(search){
                return getSpecial('posts', 'breed', search);
            }else{
                return getAll('posts');
            }
        },
        getPost: function(id){
            return getById('posts',id);
        },
        getEvents: function(number, search){
            if(search){
                return getSpecial('events', 'title', search);
            }else{
                return getAll('events');
            }
        },
        getEvent: function(id){
            return getById('events', id);
        },
		setPage: function(page) {
			self.page = "PetMe - " + page;
		},
		getUserByName: function(username) {
			for (var i = 0; i < self.users.length; i++) {
				if (self.users[i].username == username) {
					return self.users[i];
				}
			}
			return undefined;
		},
		getUser: function(key) {
			for (var i = 0; i < self.users.length; i++) {
				if (self.users[i].key == key) {
					return self.users[i];
				}
			}
			return undefined;
		},
		addPost: function(img, hashtags, info, userKey) {
			var post = new Post(userKey, self.keyPost, img, hashtags, info);
			self.keyPost = self.keyPost + 1;
			console.log(post.key);
			self.posts.push(post);
			return post;
		},
		addUser: function(username, password) {
			var user = new User(username, password, self.keyUser, "0.jpg");
			self.keyUser = self.keyUser + 1;
			self.users.push(user);
			return user;
		},
		setCurrentUser: function(user) {
			self.currentUser = user;
		},
		getCurrentUser: function() {
			return self.currentUser;
		},
		addComment: function(postKey, userKey, img, text) {
			var post = self.getPost(postKey);
			var user = self.getUser(userKey);
			var comment = new Comment(post, user, post.comments.length, img, text);
			post.comments.push(comment);
		},
        validateUser: function(username, password){
            return $http.post('/api/login', {username: username, password: password});
        },
        setCurrentUser: function(username){
            $rootScope.setToken(username);
        },
        getCurrentUser: function(){
            return $rootScope.getToken();
        },
        getUser: function(username){
            return getSpecial('users','username', username);
        },
        getUserByID: function(id){
            return getById('users', id);
        }
	};
});
