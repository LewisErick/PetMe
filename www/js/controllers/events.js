app.controller('Events', function($scope, api) {
    $scope.constants = $scope.constants.events;
    
    $scope.search;
    $scope.$watch('search',
    function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        api.getEvents(6, $scope.search).success(function(data){
            $scope.events = data;
        });
    });
    
    $scope.loadMore = function(){
        //make a request to the server for more content
        api.getMoreEvents($scope.events, 3, $scope.search).success(function(data){
            for(var i = 0; i < data.length; i++){
                $scope.events.push(data[i]);
            }
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
});