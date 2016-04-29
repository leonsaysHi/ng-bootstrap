angular.module('app').directive('somedirective', [function() {
  return {
    restrict: 'A',
    templateUrl: 'directives/somedirective.tpl.html',
    link : function (scope, element, attrs) {
      scope.directive_message = 'some directive message'
    }
  };
}]);
