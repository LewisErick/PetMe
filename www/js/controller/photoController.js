myApp.controller( 'photoController', ['$scope', '$ionicModal', 'temporalDataStorage', 'Camera', function($scope, $ionicModal, temporalDataStorage, Camera) {

	$scope.getPhoto = function() {
    	Camera.getPicture().then(function(imageURI) {
      	console.log(imageURI);
    }, function(err) {
      	console.err(err);
    })};

    $scope.getPhoto();

}]);