app.controller('Event', function ($scope, $stateParams, $ionicPopup, localStorage, api) {
    $scope.constants = $scope.constants.event;
    $scope.users = [];

    //Data from the Event
    api.getEvent($stateParams.id)
    .then(function (data) {
        $scope.event = data.data;
        
        api.checkAttendEvent($stateParams.id, localStorage.getUserID())
        .then(function (data) {
            console.log(data.data);
            $scope.attend = data.data ? true : false;
        })
        .catch(function (err) {
            console.log(err);
        });

        //Users that Will Attend the Event
        /*if($scope.event.attendUsers){
            api.getAttendUsers($scope.event.attendUsers)
            .then(function (data) {
                if(data.data){
                    $scope.users = data.data;
                }
            })
            .catch(function (err) {
                console.error(err);
            });
        }*/
    })
    .catch(function (err) {
        console.error(err);
    });

    //Attend or not to the Event
    $scope.changeAttend = function () {
        api.sendAttendConfirmation($stateParams.id, localStorage.getUserID(), !$scope.attend)
        .then(function (data) {
            $scope.attend = !$scope.attend;
        })
        .catch(function (err) {
            console.error(err);
        });
    };

    $scope.showPopup = function () {
        //List of Friends
        api.getUserByID(localStorage.getUserID())
        .then(function (data) {
            api.getUsers(data.data.friends)
            .then(function (data) {
                $scope.friends = data.data;
            })
            .catch(function (err) {
                console.error(err);
            });
        })
        .catch(function (err) {
            console.error(err);
        });

        var myPopup = $ionicPopup.show({
            template: '<ion-list><ion-checkbox ng-repeat="friend in friends" ng-model="friend.checked" ng-change="stateChanged()">{{ friend.username }}</ion-checkbox></ion-list>',
            title: 'Lista de Amigos',
            scope: $scope,
            buttons: [
                { text: 'Cancelar' },
                {
                    text: '<b>Invitar</b>',
                    type: 'button-balanced',
                    onTap: function (e) {
                        var invited = [];
                        for (var i = 0; i < $scope.friends.length; i++) {
                            if ($scope.friends[i].checked) {
                                invited.push($scope.friends[i].id);
                            }
                        }
                        api.sendInivitationEvent($stateParams.id, localStorage.getUserID(), invited)
                        .then(function (data) {

                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
    };
});
