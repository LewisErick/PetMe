var Post = (function () {

    function Post(theUser, theKey, theImg, theHash, theInfo) {
        this.img = theImg;
        this.hashtags = theHash.split(" ");
        this.inf = theInfo;
        this.comments = [];
        this.user = theUser;
        this.key = theKey;
    }
    return Post;
})();
