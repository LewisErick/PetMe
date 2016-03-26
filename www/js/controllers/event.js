app.controller('Event', function($scope, $stateParams, api) {
    $scope.constants = $scope.constants.event;
    
    //Gets the information of the event from the service request of the specific id
    api.getEvent($stateParams.id).success(function(data){
        $scope.event = data;
        $scope.users = [];
        for(var i = 0; i < $scope.event.attendUsers.length; i++){
            api.getUserByID($scope.event.attendUsers[i]).success(function(data){
                $scope.users.push({username: data.username, profilePicture: data.profilePicture});
            });
        }
    });
    
    
});