/**
 * Created by weijianli on 2015/7/27.
 */
angular.module('backpartApp').controller('dataDetailCtrl', ['$rootScope','$scope','$http','$cookies','$window','$stateParams', function ($rootScope,$scope,$http,$cookies,$window,$stateParams) {
    $scope.classId = $stateParams.dataId;


}]);