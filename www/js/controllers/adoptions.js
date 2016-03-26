app.controller('Adoptions', function($scope, api) {
    $scope.constants = $scope.constants.adoptionPosts;
    
    $scope.search;
    $scope.$watch('search', function handleChange(newValue, oldValue){
        //Gets information of the events from the service
        api.getAdoptionPosts(5, $scope.search).success(function(data){
            $scope.adoptionPosts = data;
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