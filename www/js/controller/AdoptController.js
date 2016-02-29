app.controller('AdoptController', function($scope, $timeout, $state, $filter, $rootScope, $ionicLoading, API, Language) {
    $scope.search;
    
    Language.getConstants(function(data) {
        $scope.constants = data.adoptionPosts;
    });
    
    $scope.$watch('search',
    function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        API.getAdoptionPosts(2,$scope.search).success(function(data){
            $scope.adoptionPosts = data;
        });
    });
    
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(1);
    };
    
    $scope.loadMore = function(){
        //make a request to the server for more content
        API.getMoreAdoptionPosts($scope.events, 3, $scope.search).success(function(data){
            for(var i = 0; i < data.length; i++){
                $scope.adoptionPosts.push(data[i]);
            }
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
});