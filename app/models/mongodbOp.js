/**
 * Created by weijianli on 2015/7/9.
 */
var dbClient = undefined;
var cfg = require("../../config/config.js");
var ObjectID = null;

var directoryColl=null,shujuColl=null,userColl=null;
function getDb(){
    var mongoClient = require('mongodb').MongoClient;
    ObjectID = require('mongodb').ObjectID;
    mongoClient.connect(cfg.dbUrl, function(err, db) {
        if(!err){
            //dbClient = db;
            //callback(dbClient);
            directoryColl = db.collection("directory");
            shujuColl = db.collection("shuju");
            userColl = db.collection("users");
            console.log("数据库初始化成功~");
            db.createIndex('shuju', {key:1} , {background:true, w:1}, function(err, indexName) {
                console.log("数据库添加索引~");
                console.log(indexName);
            });
        }
    });
}
getDb();



//获取目录数据
function getDirectory(callback){
    directoryColl.find({}).toArray(function(err, docs) {
        if(!err){
            /*for( index in docs ){
             docs[index]._id = docs[index]._id.id;
             }*/
            if(!docs || docs.length == 0){
              callback(null);
            }
            else{
              var fOne = docs.shift();

              var newDocs = tidyDirectory(fOne,docs);
              callback([newDocs]);
            }

        }else{
            console.log("mongoErr:"+err);
        }
    });
}
function tidyDirectory(parent,docs){

    parent.children_ = [];
    var len = docs.length;
    for( var i=0; i < len; i++){
        if(docs[i].parent.toString() == parent._id.toString()){
            parent.children_.push(docs.splice(i,1)[0]);
            len--;i--;
        }
    }

    for( var j=0; j < parent.children_.length; j++){
        if(!docs.length || docs.length <= 0){
            break;
        }else{
            parent.children_[j] = tidyDirectory(parent.children_[j],docs);
            //console.log(parent.children_[j]);
        }
    }
    return parent;
}
exports.getDirectory = getDirectory;

//插入目录
function insertDirectory(dataArray, callback){
    directoryColl.insertMany(dataArray,function(err,r){
        callback(err,r);
    });
}
exports.insertDirectory = insertDirectory;

//删除目录
function deleteDirectory(_id, callback){
    directoryColl.deleteOne({_id:ObjectID.createFromHexString(_id)},function(err,r){
        callback(err,r);
    });
}
exports.deleteDirectory = deleteDirectory;


//编辑目录
function editDirectory(_id,name, callback){
    directoryColl.updateOne({_id: ObjectID.createFromHexString(_id)}, {$set:{name: name}},function(err,r){
        callback(err,r);
    });
}
exports.editDirectory = editDirectory;

//添加目录
function addDirectory(parent,name, callback){
  var pp = "null";
    if(!!parent){
      pp = ObjectID.createFromHexString(parent);
    }
    directoryColl.insertOne({parent: pp,name: name,timestamp:(new Date()).getTime()},function(err,r){
        callback(err,r);
    });
}
exports.addDirectory = addDirectory;






//查询数据
function findData(repData, callback){
    shujuColl.find(repData).toArray(function(err,r){
        callback(err,r);
    });
}
exports.findData = findData;


//插入数据
function insertData(data, callback){
    data.timestamp = (new Date()).getTime();
    shujuColl.insertOne(data,function(err,r){
        callback(err,r);
    });
}
exports.insertData = insertData;

//更新数据
function updataDataBlock(data, callback){
    shujuColl.updateOne({_id: ObjectID.createFromHexString(data._id)}, {$set:{dataBlockName: data.dataBlockName,data:data.data}},function(err,r){
        callback(err,r);
    });
}
exports.updataDataBlock = updataDataBlock;

////删除数据
function delDataBlock(_id, callback){
    shujuColl.deleteOne({_id: ObjectID.createFromHexString(_id)},function(err,r){
        callback(err,r);
    });
}
exports.delDataBlock = delDataBlock;
////根据key值来删除数据
function delDataBlockByKey(key, callback){
  shujuColl.deleteMany({key: key},function(err,r){
    callback(err,r);
  });
}
exports.delDataBlockByKey = delDataBlockByKey;



//用户管理相关接口
function checkUser(userName,callback){
    userColl.findOne({userName:userName},function(err,doc){
        callback(err,doc);
    });
}
exports.checkUser = checkUser;
