app.controller('Register', function($scope, $interval, $ionicModal, $location, $state, api) {
    $scope.constants = $scope.constants.login;
	//Variable initialization
	$scope.form;

    $scope.countFormParams = function(form) {
        var key, count = 0;
        for(key in form) {
          if(form.hasOwnProperty(key)) {
            count++;
          }
        }
        return count;
    };

    $scope.register = function(form) {
        if (form) {
            var form = angular.copy(form);
            if ($scope.countFormParams(form) == 9) {
                api.createUser(form);
            }
        }
    };
});