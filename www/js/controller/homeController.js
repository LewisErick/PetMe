myApp.controller( 'homeController', ['$scope', '$ionicModal', '$location', 'temporalDataStorage', function($scope, $ionicModal, $location, temporalDataStorage) {

	$scope.getPosts = function() {
		return temporalDataStorage.getPosts();
	};
}]);