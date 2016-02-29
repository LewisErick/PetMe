app.controller('EventController', function($scope, $stateParams, $rootScope, API) {
    
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(0);
    };
    
    //Gets the information of the event from the service request of the specific id
    API.getEvent($stateParams.id).success(function(data){
        $scope.event = data;
    });
});