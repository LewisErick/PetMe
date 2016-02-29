myApp.directive('homePets', function($location) {
  return {
  	scope: {
  		img: '=',
  		hashtags: '=',
  		info: '=',
  		comments: '=',
  		key: '='
  	},
    templateUrl: 'directives/homePets.html',
    controller: function($scope, $element, $document){
        $scope.selectPost = function(theKey) {
    			$scope.key = theKey;
          $location.path('/post/' + $scope.key);
		  };
    }
  };
});

myApp.directive('userEntry', function() {
  return {
    scope: {
      img: '=',
      name: '=',
      text: '='
    },
    templateUrl: 'directives/userEntry.html',
    controller: function($scope, $element, $document){

    }
  };
});

//Allows to add a card with information about the pet
//<adopt-item>More Information</adopt-item>
myApp.directive('adoptItem',function() {
    return {
        replace: true,
        transclude: true,
        templateUrl: 'directives/adoptItem.html',
    };
});

//INFO
myApp.directive('eventItem',function() {
    return {
        replace: true,
        transclude: true,
        templateUrl: 'directives/eventItem.html'
    };
});

//Allows add a side menu and add content
//<menus>Content</menus>
myApp.directive('menus',function() {
    return {
        replace: true,
        transclude: true,
        templateUrl: 'directives/menus.html',
        controller: function($scope,$state){
            $scope.goto = function(toState,params){ 
                $state.go(toState,params);
            };
        }
    };
});