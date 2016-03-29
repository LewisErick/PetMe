app.controller('CreateEvent', function ($scope, $state, localStorage, api) {

    $scope.event;
    $scope.createEvent = function (event) {
        event.pictures = [];

        api.createEvent(event)
        .then(function (data) {
            $state.go('home.events');
        })
        .catch(function (err) {
            console.log(err);
        });
    };
});