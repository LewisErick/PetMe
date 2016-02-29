myApp.controller( 'userController', ['$scope', '$ionicModal', 'temporalDataStorage', '$location', '$stateParams', function($scope, $ionicModal, temporalDataStorage, $location, $stateParams) {
	$scope.userKey = $stateParams.id;
	$scope.user;

	console.log($scope.userKey);

	if ($scope.userKey == 0) {
		$scope.user = temporalDataStorage.getCurrentUser();
		console.log($scope.user.img);
	} else {
		$scope.user = temporalDataStorage.getUser($scope.userKey);
		var name = $scope.user.username;
	}
}]);