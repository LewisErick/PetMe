//Configuration to start using Angular and Ionic
var app = angular.module('PetMeApp', ['ionic']);

app.run(function ($ionicPlatform, $rootScope, localStorage) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event) {
        if (!localStorage.isSessionActive()) {
            $location.path('/login');
        }
    });
});