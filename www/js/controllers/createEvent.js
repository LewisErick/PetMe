app.controller('CreateEvent', function ($scope, $state, localStorage, api) {
    $scope.constants = $scope.constants.createEvent;

    $scope.event;
    $scope.active = false;


    $scope.changeActive = function(){
        $scope.active = !$scope.active;
    }

    $scope.checkFields = function (event) {
        return event && event.title && event.startDate && event.startDate.date && event.startDate.time && event.location && event.description;
    }

    $scope.createEvent = function (event) {
        if (!$scope.checkFields(event)) return;
        event.pictures = [];
        console.log(event);
        api.createEvent(event)
        .then(function (data) {
            $state.go('home.events');
        })
        .catch(function (err) {
            console.log(err);
        });
    };
});