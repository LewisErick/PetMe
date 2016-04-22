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
    templateUrl: 'templates/directives/userEntry.html'
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

app.directive('myRefresher', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        require: ['?^$ionicScroll', 'myRefresher'],
        controller: '$ionicRefresher',
        template:
        '<div class="scroll-refresher invisible" collection-repeat-ignore style="min-height:120px;top:-120px"> ' +
          '<div class="ionic-refresher-content" style="position: fixed;bottom:60px;height:100%"' +
          'ng-class="{\'ionic-refresher-with-text\': pullingText || refreshingText}">' +
            '<div class="icon-pulling" ng-class="{\'pulling-rotation-disabled\':disablePullingRotation}">' +
              '<i class="icon {{pullingIcon}}"></i>' +
            '</div>' +
            '<div class="icon-refreshing" style="position: fixed;bottom:0px">' +
              '<ng-transclude></ng-transclude>' +
            '</div>' +
          '</div>' +
        '</div>',
        link: function ($scope, $element, $attrs, ctrls) {

            // JS Scrolling uses the scroll controller
            var scrollCtrl = ctrls[0],
                refresherCtrl = ctrls[1];
            if (!scrollCtrl || scrollCtrl.isNative()) {
                // Kick off native scrolling
                refresherCtrl.init();
            } else {
                $element[0].classList.add('js-scrolling');
                scrollCtrl._setRefresher(
                  $scope,
                  $element[0],
                  refresherCtrl.getRefresherDomMethods()
                );

                $scope.$on('scroll.refreshComplete', function () {
                    $scope.$evalAsync(function () {
                        scrollCtrl.scrollView.finishPullToRefresh();
                    });
                });
            }

        }
    };
}]);