app.controller('Register', function($scope, $interval, $ionicModal, $location, $state, api) {
    $scope.constants = $scope.constants.login;
	//Variable initialization
	$scope.name;
	$scope.last;
    $scope.age;
    $scope.marital;
    $scope.municipality;
    $scope.muns;
    $scope.house_phone;
    $scope.cel_phone;
    $scope.email;
    $scope.password;

    $scope.register = function() {
        console.log("Validate registration.");
        console.log("Register!");
        var form = {
            name:$scope.name, 
            last:$scope.last, 
            age:$scope.age,
            marital:$scope.marital,
            municipality:$scope.municipality, 
            house: $scope.house_phone,
            cel: $scope.cel_phone,
            email:$scope.email,
            profile_picture: "0.jpg",
            friends: [],
            pets: []
        };

        api.registerUser();
    };
});