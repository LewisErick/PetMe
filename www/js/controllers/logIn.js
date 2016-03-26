app.controller('LogIn', function($scope, $interval, $ionicModal, $location, $state, api) {
    $scope.constants = $scope.constants.login;
	//Variable initialization
	$scope.username;
	$scope.password;
    $scope.showMessage;

    $scope.background_img_url = "0.jpg";
    $scope.background_imgs = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
    $scope.background_img_index = 0;

    $interval(function() {
        console.log("Oie cy");
        $scope.background_img_index = ($scope.background_img_index + 1) % 4;
        $scope.background_img_url = $scope.background_imgs[$scope.background_img_index];

    }, 5000);

	//Perform user-password validation and authentification
	$scope.logIn = function(username, password) {
        console.log("Execute1");
		api.validateUser(username, password).success(function(data){
            console.log("Execute2");
            if(data){
                console.log(data);
                api.setCurrentUser(username);
                //Switch to the home template (see the stateConfiguration.js file for details)
                $scope.showMessage = false;
                $state.go('home.dashboard');
            }else{
                $scope.showMessage = true;
                //Incorrect username or password
            }
        });
	};
});