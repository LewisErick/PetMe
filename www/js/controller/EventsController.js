app.controller('EventsController', function($scope, $rootScope, API, Language) {
    $scope.search;
    $scope.maxCharacters = 100;
    //The max character to be shown in the description of the item
    
    Language.getConstants(function(data) {
        $scope.constants = data.events;
    });
    
    $scope.$watch('search',
    function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        API.getEvents(6, $scope.search).success(function(data){
            $scope.events = data;
        });
    });
    
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(1);
    };
    
    $scope.loadMore = function(){
        //make a request to the server for more content
        API.getMoreEvents($scope.events, 3, $scope.search).success(function(data){
            for(var i = 0; i < data.length; i++){
                $scope.events.push(data[i]);
            }
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
});