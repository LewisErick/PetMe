app.controller('Home', function($scope, $state, $rootScope, api) {
    
    /*No functionality yet*/
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(1);
    };
    
    $scope.goToProfile = function(){
        $state.go('home.profile', {username: api.getCurrentUser()});
    }
    
});