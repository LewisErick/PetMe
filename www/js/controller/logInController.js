myApp.controller( 'logInController', ['$scope', '$ionicModal', 'temporalDataStorage', '$location', function($scope, $ionicModal, temporalDataStorage, $location) {
	//Variable initialization
	$scope.username;
	$scope.password;

	//Perform user-password validation and authentification
	$scope.logIn = function(username, password) {
		var user = temporalDataStorage.getUserByName(username);
		if (user && user.password == password) {
			temporalDataStorage.setCurrentUser(user);
			//Switch to the home template (see the stateConfiguration.js file for details)
			$scope.goTo('home.dashboard');
		}
	};
}]);