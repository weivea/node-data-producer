/**
 * Created by weijianli on 2015/5/27.
 */
angular.module('backpartApp')
    .controller('dataManageCtrl',['$rootScope','$scope','$http','menuShow', function ($rootScope,$scope,$http,menuShow) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.directory = null;

        $scope.initDirectory = function(){
            $http.get("/db/directory",null)
                .success(function(data, status, headers, config) {
                    if(data.error){
                        alert(data.error);
                    }else{
                        $scope.directory = data;
                    }

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        $scope.initDirectory();



        //目录数据的处理
        $scope.curMenu = null;
        $scope.newMenuName = null;
        $rootScope.addSubMenu = function(){//添加子菜单
            angular.element("#AddModal").modal('show');
        };
        $scope.addMenuSave = function(){
            $http.post("/db/opDirectory",{operation:"add", parent:$scope.curMenu._id, name:$scope.newMenuName})
                .success(function(data, status, headers, config) {
                    $scope.newMenuName = '';
                    if(!data.error){
                        angular.element("#AddModal").modal('hide');
                        alert("添加成功");
                        $scope.initDirectory();
                    }else{
                        alert(JSON.stringify(data.error));
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        $rootScope.editMenu = function(){//编辑菜单
            angular.element("#EditModal").modal('show');
        };
        $scope.editMenuSave = function(){
            $http.post("/db/opDirectory",{operation:"edit",_id:$scope.curMenu._id,name:$scope.curMenu.name})
                .success(function(data, status, headers, config) {
                    if(!data.error){
                        angular.element("#EditModal").modal('hide');
                        alert("修改成功");
                        $scope.initDirectory();
                    }else{
                        alert(JSON.stringify(data.error));
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        $rootScope.deletMenu = function(){//删除菜单
            if($scope.curMenu.hasch){
                alert("包含子目录，无法删除。请先删除子目录");
            }else if($scope.curMenu.boss){
                alert("根目录，无法删除。");
            }else{
                $http.post("/db/opDirectory",{operation:"delete",_id:$scope.curMenu._id})
                    .success(function(data, status, headers, config) {
                        if(!data.error){
                            alert("删除成功");
                            $scope.initDirectory();
                        }else{
                            alert(JSON.stringify(data.error));
                        }
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                    });
            }
        };

        $scope.$on("editDirectory",function(e,data){
            e.preventDefault();
            e.stopPropagation();
            $scope.curMenu = {
                _id:data._id,
                name:data.name,
                hasch:data.hasch,
                boss:data.boss
            };
            menuShow("menu1",{x:data.x,y:data.y});
        });


        /*editDirectory=function(_id,name){
            console.log("_id:"+_id);
            console.log("name:"+name);
        }*/

    }]);