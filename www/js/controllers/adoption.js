app.controller('Adoption', function($scope, $stateParams, api) {
    $scope.constants = $scope.constants.adoptionPost;
    
    //Gets the information of the pet in adoption from the service request of the specific id
    api.getAdoptionPost($stateParams.id).success(function(data){
        $scope.adoptionPost = data;
    });
    
    $scope.getEdad = function(age){
        var text = '';
        if(age.years > 0){
            text += age.years + ' ';
            text += (age.years <= 1) ? 'año' : 'años';
            if(age.months > 0){
                text += ' y ';
            }
        }
        if(age.months > 0){
            text += age.months + ' ';
             text += (age.months <= 1) ? 'mes' : 'meses';
        }
        return text;
    }
});