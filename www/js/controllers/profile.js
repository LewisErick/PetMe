app.controller('Profile', function($scope, $ionicModal, $location, $stateParams, api) {
	$scope.userKey = $stateParams.username;
	$scope.user;
	$scope.friends = [];
    
	api.getUser($scope.userKey)
    .then(function (data) {
        $scope.user = data.data;
        if ($scope.user.friends) {
            for (var i = 0; i < $scope.user.friends.length; i++) {
                api.getUserByID($scope.user.friends[i])
                .then(function (data) {
                    var friend = data.data;
                    $scope.friends.push({ username: friend.username, profilePicture: friend.profilePicture });
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
        }
    })
    .catch(function (err) { 
        console.log(err);
    });
    
});