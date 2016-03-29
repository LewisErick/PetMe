app.controller('Home', function($scope, $state, api, localStorage) {
    
    /*No functionality yet*/
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(1);
    };
    
    $scope.goToProfile = function(){
        $state.go('home.profile', {username: localStorage.getUsername()});
    }

    $scope.logOff = function(){
        localStorage.clearUser();
        $state.go('login');
    };
    
});