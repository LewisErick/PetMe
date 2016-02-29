app.controller('PetAdoptionController', function($scope, $stateParams, $rootScope, API) {
    
    $scope.doRefresh = function(){
        //make a new request to the server of the data
        $rootScope.doRefresh(0);
    };
    
    //Gets the information of the pet in adoption from the service request of the specific id
    API.getPet($stateParams.id).success(function(data){
        $scope.adoptionPost = data;
    });
    //Gets the questions of the pet in adoption from the service request
    //$scope.questions = temporalDataStorage.questions;
});