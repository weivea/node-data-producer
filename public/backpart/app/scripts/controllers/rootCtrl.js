/**
 * Created by weijianli on 2015/8/11.
 */
angular.module('backpartApp').controller('rootCtrl', ['$rootScope','$scope','$http','$location','$window', function ($rootScope,$scope,$http,$location,$window) {
    $rootScope.isLogin = false;
    $rootScope.userData = null;
    $rootScope.urlrootPath = $window.location.host;

    function getLoginedUser( callback){
        $http.post('/login/getLoginedUser',null)
            .success(function(data, status, headers, config) {
                if(data.creatUser){
                  $location.path("/userManage")
                }
                else if(data.error){
                    alert(data.error);
                    $location.path("/login");
                }else{
                    $rootScope.userData = data;
                    $rootScope.isLogin = true;
                    callback($rootScope.isLogin);
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
    }

    $scope.logoutOp = function(){
        $http.post('/login/logoutPost',null)
            .success(function(data, status, headers, config) {
                $location.path("/main");
                $rootScope.userData = null;
                $rootScope.isLogin = false;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    $scope.$on('$locationChangeStart', function(e,d){
        //未登录，且不在登陆界面，也不在主页面，则跳回到登陆界面
        if(d.indexOf("main") == -1 && d.indexOf("login") == -1 ){
            if(!$rootScope.userData){
                getLoginedUser(function(isLogin){
                    if(!isLogin){
                        $location.path("/login");
                    }
                });
            }
        }
    });

}]);
