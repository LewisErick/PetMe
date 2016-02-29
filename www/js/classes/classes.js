//Class that holds the information of a comment
var Question = function(question, answer) {
    this.question = question;
    this.answer = answer;
};

//Class that holds information about a Pet
var Pet = function(owner, breed, age) {
    this.owner = owner;
    this.breed = breed;
    this.age = age;
};

var PostAdoption = function(pet, imgs, hashtags) {
    this.pet = pet;
    this.imgs = imgs;
    this.hashtags = hashtags;
}

//Class that holds basic information about an Event
var Event = function(organization, title, description, date, img, questions, template) {
    this.organization = organization;
    this.title = title;
    this.description = description;
    this.date = date;
    this.img = img;
    this.questions = questions;
    this.template = template;
};

//Allows side menu to be shown when swiped
function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
}