/**
 * Created by weijianli on 15/10/15.
 */
angular.module('backpartApp')
  .controller('userManageCtrl',['$rootScope','$scope','$http','$location','$window','menuShow', function ($rootScope,$scope,$http,$location,$window,menuShow) {

    $scope.modaTitle='';
    $scope.userOptionWay='';
    $scope.newUser= {
      userName:'',
      pass:''
    };
    $scope.editUser=null;

    getUsers();
    function getUsers(){
      $http.post('/opUsers/getUsers',null)
        .success(function(data, status, headers, config) {
          if(data.creatUser){
            creatUser();
          }
          else if(data.error){
            alert(data.error);
            $location.path("/login");
          }else{
            $scope.users = data;
          }
        }).error(function(data, status, headers, config) {
          console.log(data);
        });

    }


    function creatUser(){
      $scope.userOptionWay='add';
      $scope.modaTitle='创建新的用户';
      $scope.editUser = $scope.newUser;
      angular.element("#userModal").modal('show');
    }

    $scope.saveUserOP = function(){
      var askData = {
        way:$scope.userOptionWay,
        user:$scope.editUser
      };
      $http.post('/opUsers/manage',askData)
        .success(function(data, status, headers, config) {
          if(data.error){
            alert(data.error);
          }else if(data.tologin){
            alert("用户创建成功！去登录？");
            angular.element("#userModal").modal('hide');
            $location.path("/login");
          }else{
            angular.element("#userModal").modal('hide');
            getUsers();
          }


        }).error(function(data, status, headers, config) {
          console.log(data);
        });
    }

  }]);
