app.controller('Register', function($scope, $interval, $ionicModal, $location, $state, api) {
    $scope.constants = $scope.constants.login;
	//Variable initialization
	$scope.name;
	$scope.last;
    $scope.age;
    $scope.marital;
    $scope.municipality;

    $scope.register = function() {
        console.log("Validate registration.");
        console.log("Register!");
    };
});