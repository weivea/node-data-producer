'use strict';

/**
 * @ngdoc overview
 * @name backpartApp
 * @description
 * # backpartApp
 *
 * Main module of the application.
 */
angular
  .module('backpartApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/examManage', {
        templateUrl: 'views/examManage.html',
        controller: 'examManageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
