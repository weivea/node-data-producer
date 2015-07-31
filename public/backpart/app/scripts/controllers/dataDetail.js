/**
 * Created by weijianli on 2015/7/27.
 */
angular.module('backpartApp').controller('dataDetailCtrl', ['$rootScope','$scope','$http','$cookies','$window','$stateParams', function ($rootScope,$scope,$http,$cookies,$window,$stateParams) {
    $scope.classId = $stateParams.dataId;
    $scope.dataBlockShow = null;//数据块详细内容显示标志
    $scope.dataList = [];//这一页的数据数组
    $scope.editingDataBlock = {};//正在编辑的数据块
    $scope.newDataBlock = {
        data: [],
        dataBlockName: "新增数据块",
        key: $scope.classId
    };
    $scope.DataBlockOPWay=null;
    function initData(){
        $http.get("/getData?key="+$scope.classId)
        .success(function(data, status, headers, config) {
            if(!data.error){
                console.log(data);
                $scope.dataList = data.data;
            }else{
                alert(JSON.stringify(data.error));
            }
        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    }
    initData();

    $scope.showDataDetail =function(_id){//展示数据块
        if(!!_id){
            $scope.DataBlockOPWay = "edit";
            var index;
            for(index in $scope.dataList){
                if($scope.dataList[index]._id == _id){
                    $scope.editingDataBlock = $scope.dataList[index];
                    break;
                }
            }
        }else{
            $scope.DataBlockOPWay = "add";
            $scope.editingDataBlock = $scope.newDataBlock;
        }

        $scope.dataBlockShow = 'show';
    };
    $scope.addDataProperty = function(){
        $scope.editingDataBlock.data.push({

            keyName:"",
            val:"",
            desc:""

        });
    };
    $scope.delDataProperty = function(index){
        $scope.editingDataBlock.data.splice(index,1);
    };

    $scope.saveDataBlock = function(){//保存数据块
        $http.post("/saveDataBlock",{dataBlock:$scope.editingDataBlock})
            .success(function(data, status, headers, config) {
                if(!data.error){
                    alert("修改成功");
                    initData();
                }else{
                    alert(JSON.stringify(data.error));
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    $scope.insertDataBlock = function(){//插入数据块
        $http.post("/insertDataBlock",{dataBlock:$scope.editingDataBlock})
            .success(function(data, status, headers, config) {
                if(!data.error){
                    alert("修改成功");
                    $scope.dataBlockShow = 'hidden_';
                    initData();
                }else{
                    alert(JSON.stringify(data.error));
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    $scope.delDataBlock = function(_id){
        $http.post("/delDataBlock",{_id:_id})
            .success(function(data, status, headers, config) {
                if(!data.error){
                    alert("删除成功");
                    initData();
                }else{
                    alert(JSON.stringify(data.error));
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
    };


    function tidyData(data){//处理从服务端湖区的数据一便显示
        var dataList = [];
        var index,property,tmpData;
        for(index in data){
            tmpData = [];
            for (property in data[index].data){
                tmpData.push({
                    keyName: property,
                    value:data[index][property]
                });
            }
            dataList.push({
                _id:data[index]._id,
                key:data[index].key,
                data:tmpData
            });
        }
        return dataList;
    }
}]);