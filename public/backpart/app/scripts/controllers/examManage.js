/**
 * Created by weijianli on 2015/5/27.
 */
angular.module('backpartApp')
    .controller('examManageCtrl',['$scope','$http', function ($scope,$http) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.directory = null;

        $http.get("/directory",null)
            .success(function(data, status, headers, config) {
                $scope.directory = data.data;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });

    }]);