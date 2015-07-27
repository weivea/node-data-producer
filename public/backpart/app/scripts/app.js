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
    'ui.router',
    'ngSanitize',
    'ngTouch'

  ])
.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .when('/events/:classType/:classId', '/events/:classType/:classId/list')//默认跳转到列表页面
        .otherwise('/main');
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('dataManage', {
            url: '/dataManage',
            templateUrl: 'views/dataManage.html',
            controller: 'dataManageCtrl'
        })
        .state('dataManage.detail', {
            url: '/detail/:dataId',
            templateUrl: 'views/dataDetail.html',
            controller: 'dataDetailCtrl'
        });
});