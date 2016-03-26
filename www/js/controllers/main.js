app.controller('Main', function($scope, $state, constants, api) {
    $scope.constants = constants.getConstants();
});