var Comment = (function () {

    function Comment(thePost, theUser, theKey, theImg, theInfo) {
    	console.log(theInfo);
    	this.post = thePost;
        this.img = theImg;
        this.inf = theInfo;
        this.user = theUser;
        this.key = theKey;
    }
    return Comment;
})();
