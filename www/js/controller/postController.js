myApp.controller( 'postController', ['$scope', '$ionicModal', 'temporalDataStorage', '$location', '$stateParams', function($scope, $ionicModal, temporalDataStorage, $location, $stateParams) {
	$scope.postKey = $stateParams.id;
	$scope.post;

	$scope.post = temporalDataStorage.getPost($scope.postKey);
}]);