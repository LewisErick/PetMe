app.controller('Events', function($scope, api) {
    $scope.constants = $scope.constants.events;
    
    $scope.search;
    $scope.$watch('search', function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        api.getEvents(6, $scope.search)
        .then(function (data) {
            $scope.events = data.data;
        })
        .catch(function(err){
            console.log(err);
        });
    });
    
    /*TODO: Implement Load More*/
    /*$scope.loadMore = function(){
        //make a request to the server for more content
        api.getMoreEvents($scope.events, 3, $scope.search)
        .then(function (data) {
            //$scope.events = data.data;
        })
        .catch(function (err) {
            console.log(err);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };*/
});