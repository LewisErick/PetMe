myApp.controller('mainController', ['$scope', '$ionicModal', 'temporalDataStorage', '$location', '$state', function($scope, $ionicModal, temporalDataStorage, $location, $state) {


	temporalDataStorage.addUser("Lewis", "lewis");
	temporalDataStorage.addPost("0.jpg", "#dog #test", "Este es una publicación de prueba.", 1);
	temporalDataStorage.addPost("0.jpg", "#dog #test", "Este es una publicación de prueba.", 1);
	temporalDataStorage.addPost("0.jpg", "#dog #test", "Este es una publicación de prueba.", 1);
	temporalDataStorage.addPost("0.jpg", "#dog #test", "Este es una publicación de prueba.", 1);

	temporalDataStorage.addComment(1, 1, "0.jpg", "Comentario de prueba");

	$scope.goTo = function(toState, params){
        $state.go(toState, params);
    }
}]);