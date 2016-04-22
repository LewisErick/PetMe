app.controller('CreateAdoption', function ($scope, $state, localStorage, api) {
    $scope.constants = $scope.constants.createEvent;

    $scope.adoption;
    $scope.active = false;


    $scope.changeActive = function () {
        $scope.active = !$scope.active;
    }

    $scope.checkFields = function (adoption) {
        return adoption && adoption.title;
    }

    $scope.createAdoption = function (adoption) {
        if (!$scope.checkFields(adoption)) return;
        console.log(adoption);
        api.createAdoption(adoption)
        .then(function (data) {
            $state.go('home.adoptions');
        })
        .catch(function (err) {
            console.log(err);
        });
    };
});