app.directive('homePets', function() {
  return {
      replace: true,
      templateUrl: 'templates/directives/homePets.html'
  };
});

app.directive('userEntry', function() {
  return {
    scope: {
      id: '=',
      img: '=',
      name: '=',
      text: '='
    },
    templateUrl: 'templates/directives/userEntry.html',
    controller: function($scope, $element, $document, api){
      api.getComment($scope.id).success(function(data){
          $scope.post = data;
      });
      $scope.img = data.img;
      $scope.name = data.name;
      $scope.text = data.text;
    }
  };
});
//Allows add a card with information about the pet
//<adopt-item>More Information</adopt-item>
app.directive('adoptItem', function() {
    return {
        replace: true,
        transclude: true,
        templateUrl: 'templates/directives/adoptItem.html',
    };
});

//Allows add an item with some information about the event
//<event-item>More Information</event-item>
app.directive('eventItem', function() {
    return {
        replace: true,
        transclude: true,
        templateUrl: 'templates/directives/eventItem.html'
    };
});