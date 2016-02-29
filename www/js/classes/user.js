var User = (function () {
    function User(theUser, thePassword, theKey, theImg) {
        this.username = theUser;
        this.password = thePassword;
        this.key = theKey;
        console.log(this.key);
        this.posts = [];
        this.pets = [];
        this.img = theImg;
    }

    return User;
})();
