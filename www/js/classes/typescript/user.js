var User = (function () {
    function User(theUser, thePassword, theKey) {
        this.pets = [];
        this.petKey = 1;
        this.username = theUser;
        this.password = thePassword;
        this.key = theKey;
    }
    
    return User;
})();
