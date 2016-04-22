app.factory('localStorage', function ($rootScope, $window) {

    return {
        setUser: function (user) {
            $window.localStorage.userID = user._id;
        },
        getUserID: function () {
            return $window.localStorage.userID;
        },
        clearUser: function () {
            $window.localStorage.userID = "";
        },
        isSessionActive: function () {
            return $window.localStorage.userID ? true : false;
        }
    };
});