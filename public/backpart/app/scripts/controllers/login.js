/**
 * Created by weijianli on 2015/8/10.
 */
angular.module('backpartApp').controller('LoginCtrl', ['$rootScope','$scope','$http','$cookies','$window','$stateParams', function ($rootScope,$scope,$http,$cookies,$window,$stateParams) {
    $scope.login = function(valid){
        if(valid){
            var queryData = angular.element("form.loginForm").serializeArray();
            var queryData2 = {};
            queryData.map(function(data){
                queryData2[data.name] = data.value;
            });
            $http.post('/login/loginPost',queryData2)
                .success(function(data, status, headers, config) {
                    if(data.error){
                        alert(data.error);
                    }else{
                        $rootScope.userData = data;
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
        }
    };

}]);