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

    $scope.register = function() {
        console.log("Validate registration.");
        console.log("Register!");
        var form = {
            name:$scope.name, 
            last:$scope.last, 
            age:$scope.age, 
            marital:$scope.marital,
            municipality:$scope.municipality, 
            email:email
        };
        { "_id" : 2, "username" : "Erick", "name" : "Erick", "password" : "erick", "email" : "lewis.erick@outlook.com", "profile_picture" : "0.jpg", "friends" : [ 1 ], "pets" : [ 1 ] }

        api.registerUser()
    };
});