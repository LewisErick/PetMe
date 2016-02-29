myApp.service('temporalDataStorage', function() {
	var self = this;
	this.users = [];
	this.posts = [];
	this.pets = [];
	this.currentUser;
	this.keyUser = 1;
	this.keyPost = 1;

	this.events = [
        { title: 'Conoce más perros', description: 'blasodkfo oaksdf okasdof ksadok askoasdk ofaksdof kaosdf koas dkfoasd kofaks dofk oa sdkfo asdk ofk asdf', date: '25/01/2016', img: 'img/ionic.png' }, 
        { title: 'Corre con tu perro', description: 'oaskdf oakso aspasdk cpas dpasd pcpasd asdkva sko caslc kasx kcas casko casddco asdk coask cos akc oaksd ockas odkoo osdkos kosk dosdk oasd', date: '08/02/2016', img: 'img/ionic.png' },
        { title: 'Conoce más perros', description: 'blasodkfo oaksdf okasdof ksadok askoasdk ofaksdof kaosdf koas dkfoasd kofaks dofk oa sdkfo asdk ofk asdf', date: '25/01/2016', img: 'img/ionic.png' }, 
        { title: 'Corre con tu perro', description: 'oaskdf oakso aspasdk cpas dpasd pcpasd asdkva sko caslc kasx kcas casko casddco asdk coask cos akc oaksd ockas odkoo osdkos kosk dosdk oasd', date: '08/02/2016', img: 'img/ionic.png' },
        { title: 'Conoce más perros', description: 'blasodkfo oaksdf okasdof ksadok askoasdk ofaksdof kaosdf koas dkfoasd kofaks dofk oa sdkfo asdk ofk asdf', date: '25/01/2016', img: 'img/ionic.png' }, 
        { title: 'Corre con tu perro', description: 'oaskdf oakso aspasdk cpas dpasd pcpasd asdkva sko caslc kasx kcas casko casddco asdk coask cos akc oaksd ockas odkoo osdkos kosk dosdk oasd', date: '08/02/2016', img: 'img/ionic.png' },
        { title: 'Conoce más perros', description: 'blasodkfo oaksdf okasdof ksadok askoasdk ofaksdof kaosdf koas dkfoasd kofaks dofk oa sdkfo asdk ofk asdf', date: '25/01/2016', img: 'img/ionic.png' }, 
        { title: 'Corre con tu perro', description: 'oaskdf oakso aspasdk cpas dpasd pcpasd asdkva sko caslc kasx kcas casko casddco asdk coask cos akc oaksd ockas odkoo osdkos kosk dosdk oasd', date: '08/02/2016', img: 'img/ionic.png' },
        { title: 'Conoce más perros', description: 'blasodkfo oaksdf okasdof ksadok askoasdk ofaksdof kaosdf koas dkfoasd kofaks dofk oa sdkfo asdk ofk asdf', date: '25/01/2016', img: 'img/ionic.png' }, 
        { title: 'Corre con tu perro', description: 'oaskdf oakso aspasdk cpas dpasd pcpasd asdkva sko caslc kasx kcas casko casddco asdk coask cos akc oaksd ockas odkoo osdkos kosk dosdk oasd', date: '08/02/2016', img: 'img/ionic.png' }
    ];

	this.page;

	//List of Questions & Answers. WILL BE REMOVED
    this.questions = [
        new Question('la?','ne'),
        new Question('sa?','be'),
        new Question('ma?','te'),
        new Question('ta?','re'),
        new Question('wa?','ke'),
        new Question('ra?','ge')
    ];
    //List of pets. WILL BE REMOVED
    this.pets = [
        new Pet('Prodan', 'Criollo', ['/img/ionic.png','/img/ionic2.png'], ['#hola','#sa','#da']),
        new Pet('Prodan', 'Criollo', ['/img/ionic.png'], ['#hola','#sa','#da']),
        new Pet('Prodan', 'Criollo', ['/img/ionic.png'], ['#hola','#sa','#da'])
    ];

	this.setPage = function(page) {
		self.page = "PetMe - " + page;
	}

	this.getUserByName = function(username) {
		for (var i = 0; i < self.users.length; i++) {
			if (self.users[i].username == username) {
				return self.users[i];
			}
		}
		return undefined;
	}

	this.getUser = function(key) {
		for (var i = 0; i < self.users.length; i++) {
			if (self.users[i].key == key) {
				return self.users[i];
			}
		}
		return undefined;
	}

	this.getPost = function(key) {
		console.log(key);
		for (var i = 0; i < self.posts.length; i++) {
			if (self.posts[i].key == key) {
				return self.posts[i];
			}
		}
		return undefined;
	}

	this.addPost = function(img, hashtags, info, userKey) {
		var post = new Post(userKey, self.keyPost, img, hashtags, info);
		self.keyPost = self.keyPost + 1;
		console.log(post.key);
		self.posts.push(post);
		return post;
	}

	this.addUser = function(username, password) {
		var user = new User(username, password, self.keyUser, "0.jpg");
		self.keyUser = self.keyUser + 1;
		self.users.push(user);
		return user;
	}

	this.getPosts = function() {
		return self.posts;
	}

	this.setCurrentUser = function(user) {
		self.currentUser = user;
	}

	this.getCurrentUser = function() {
		return self.currentUser;
	}

	this.addComment = function(postKey, userKey, img, text) {
		var post = self.getPost(postKey);
		var user = self.getUser(userKey);
		var comment = new Comment(post, user, post.comments.length, img, text);
		post.comments.push(comment);
	}
});