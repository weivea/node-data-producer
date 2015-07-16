'use strict';

/**
 * @ngdoc function
 * @name backpartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backpartApp
 */
angular.module('backpartApp')
    .controller('MainCtrl',['$scope','$http', function ($scope,$http) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];


    }]);
