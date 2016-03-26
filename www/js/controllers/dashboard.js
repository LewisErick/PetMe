app.controller('Dashboard', function($scope, $location, api) {
    $scope.constants = $scope.constants.posts;
    
    $scope.search;
    $scope.$watch('search', function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        api.getPosts(5, $scope.search).success(function(data){
            $scope.posts = data;
        });
    });
    
    $scope.loadMore = function(){
        //make a request to the server for more content
        /*api.getMoreAdoptionPosts($scope.events, 3, $scope.search).then(function(data){
            for(var i = 0; i < data.length; i++){
                $scope.adoptionPosts.push(data[i]);
            }
        });*/
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
});