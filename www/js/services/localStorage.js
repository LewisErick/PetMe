app.factory('localStorage', function ($rootScope, $window) {

    return {
        setUser: function (user) {
            $window.localStorage.username = user.username;
            $window.localStorage.userID = user._id;
        },
        getUserID: function () {
            return $window.localStorage.userID;
        },
        clearUser: function () {
            $window.localStorage.username = "";
            $window.localStorage.userID = "";
        },
        getUsername: function () {
            return $window.localStorage.username;
        },
        isSessionActive: function () {
            return $window.localStorage.username ? true : false;
        }
    };
});