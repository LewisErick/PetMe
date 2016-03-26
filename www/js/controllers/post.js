app.controller('Post', function($scope, $stateParams, api) {
	$scope.constants = $scope.constants.post;
    
    //Gets the information of the pet in adoption from the service request of the specific id
    api.getPost($stateParams.id).success(function(data){
        $scope.post = data;
    });
});