app.controller('Profile', function($scope, $ionicModal, $location, $stateParams, api) {
	$scope.userKey = $stateParams.username;
	$scope.user;
    
    api.getUser($scope.userKey).success(function(data){
        $scope.user = data;
    });
    
    $scope.friends = [];
    api.getUser($scope.userKey).success(function(data){
        for(var i = 0; i < data.friends.length; i++){
            api.getUserByID(data.friends[i]).success(function(dat){
                $scope.friends.push({username: dat.username, profilePicture: dat.profilePicture});
            });
        }
    });
});