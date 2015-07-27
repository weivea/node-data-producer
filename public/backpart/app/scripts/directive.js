/**
 * Created by weijianli on 2015/7/9.
 */
angular.module('backpartApp').directive("tree", function(RecursionHelper) {

    var link = function(scope, element, attrs) {
        if(attrs.tier == "root"){
            scope.showMe = true;
        }else{
            scope.showMe = false;
        }


        scope.toggle = function toggle() {
            scope.showMe = !scope.showMe;
        };


        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                event.stopPropagation();
                scope.$emit("editDirectory",{
                    x:event.clientX,
                    y:event.clientY,
                    _id:scope.family._id,
                    name:scope.family.name,
                    hasch:(scope.family.children_ && scope.family.children_.length && scope.family.children_.length > 0)?true:false,
                    boss:(scope.family.parent)?false:true
                });
                //fn(scope, {$event:event});
            });
        });
    };
    return {
        restrict: "E",
        scope: {
            family: '=family'

        },
        template:
            '<a ng-click="toggle()" href="#/dataManage/detail/{{family._id}}">' +
            '{{ (family.name)?family.name:"未命名" }} ' +
            '<span ng-if="family.children_.length" class="pull-right glyphicon glyphicon-chevron-down" aria-hidden="true"></span>' +
            '</a>'+
            '<ul class="list-group" ng-if="family.children_.length" ng-show="showMe">' +
            '<li class="list-group-item"  ng-repeat="item in family.children_">' +
            '<tree family="item"></tree>' +
            '</li>' +
            '</ul>',
        compile: function(element) {
            return RecursionHelper.compile(element,link);
        }
    };
});