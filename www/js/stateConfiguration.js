myApp.config( function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'logInController'
	});

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'templates/home.html',
	});

	$stateProvider.state('home.dashboard', {
		url: '/dashboard',
		templateUrl: 'templates/dashboard.html',
		controller: 'homeController'
	});

	$stateProvider.state('home.adopt', {
        url: '/adopt',
        parent: 'home',
        templateUrl: 'templates/adopt.html',
        controller: 'AdoptController'
    })

    $stateProvider.state('home.events', {
        url: '/events',
        parent: 'home',
        templateUrl: 'templates/events.html',
        controller: 'EventsController'
    })

    $stateProvider.state('petAdoption', {
        url: '/petAdoption/:id',
        params: { id: null},
        cache: false,
        templateUrl: 'templates/petAdoption.html',
        controller: 'PetAdoptionController'
    })
    $stateProvider.state('event', {
        url: '/event/:id',
        params: {'id': null},
        cache: false,
        templateUrl: 'templates/event.html',
        controller: 'EventController'
    });

	$stateProvider.state('home.profile', {
		url: '/user/:id',
		parent: 'home',
		params: {'id': null},
        cache: false,
		templateUrl: 'templates/user.html',
		controller: 'userController'
	});

	$stateProvider.state('post', {
		url: '/post/:id',
		templateUrl: 'templates/post.html',
		controller: 'postController'
	});

	$stateProvider.state('photo', {
		url: '/photo',
		templateUrl: 'templates/photo.html',
		controller: 'photoController'
	});

	$urlRouterProvider.otherwise('/login');
});