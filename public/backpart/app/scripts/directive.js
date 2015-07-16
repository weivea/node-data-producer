/**
 * Created by weijianli on 2015/7/9.
 */
angular.module('backpartApp').directive("tree", function(RecursionHelper) {

    var link = function(scope, element, attrs) {
        scope.showMe = true;

        scope.toggle = function toggle() {
            scope.showMe = !scope.showMe;

        }
    };
    return {
        restrict: "E",
        scope: {
            family: '=family'

        },
        template:
            '<p ng-click="toggle()">{{ family.name }}</p>'+
            '<ul ng-show="showMe">' +
            '<li ng-repeat="item in family.children">' +
            '<tree family="item"></tree>' +
            '</li>' +
            '</ul>',
        compile: function(element) {
            return RecursionHelper.compile(element,link);
        }
    };
});