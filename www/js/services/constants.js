app.factory('constants', function($http) {
    var language = "spanish";
    var request = new XMLHttpRequest();
    request.open("GET", "./json/words.json", false);
    request.send(null);
    var result = JSON.parse(request.responseText);
    return {
        setLanguage: function(lan){
            language = lan;
        },
        getLanguage: function(){
            return language;
        },
        getConstants: function() {
            return result[language];
        }
    };
});