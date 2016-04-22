//Configuration to start using Angular and Ionic
var app = angular.module('PetMeApp', ['ionic']);

app.run(function ($ionicPlatform, $rootScope, $location, localStorage) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    //Checks the State and Redirects to the correct Page depending on whether the Session is Active
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'login') {
            if (localStorage.isSessionActive()) {
                $location.path('/home/dashboard');
            }
        } else {
            if (!localStorage.isSessionActive()) {
                $location.path('/login');
            }
        }
    });
});