/**
 * Created by weijianli on 2015/7/9.
 */
var dbClient = undefined;
var cfg = require("../../config/config.js");
var ObjectID = null;
function getDb(callback){
    var mongoClient = require('mongodb').MongoClient;
    ObjectID = require('mongodb').ObjectID;
    mongoClient.connect(cfg.dbUrl, function(err, db) {
        if(!err){
            dbClient = db;
            callback(dbClient);
        }
    });
}

//获取目录数据
function getDirectory(callback){
    if(dbClient){
        doGetDirectory(dbClient,callback);
    }else{
        getDb(function(db_client){
            doGetDirectory(db_client,callback);
        });
    }
}
function doGetDirectory(dbc,callback){
    dbc.collection("directory",function(err, collection) {
        if(!err){
            collection.find().toArray(function(err, docs) {
                if(!err){
                    /*for( index in docs ){
                        docs[index]._id = docs[index]._id.id;
                    }*/
                    var fOne = docs.shift();
                    var newDocs = tidyDirectory(fOne,docs);
                    callback([newDocs]);
                }else{
                    console.log("mongoErr:"+err);
                }
            });
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
            console.log(parent.children_[j]);
        }
    }
    return parent;
}
exports.getDirectory = getDirectory;

//插入目录
function insertDirectory(dataArray, callback){
    if(dbClient){
        doInsertDirectory(dbClient,dataArray, callback);
    }else{
        getDb(function(db_client){
            doInsertDirectory(db_client,dataArray,callback);
        });
    }
}
function doInsertDirectory(dbc, dataArray, callback){
    var collection = dbc.collection("directory");


    collection.insertMany(dataArray,function(err,r){
        callback(err,r);
    });

}
exports.insertDirectory = insertDirectory;

//删除目录
function deleteDirectory(_id, callback){
    if(dbClient){
        dodeleteDirectory(dbClient,_id, callback);
    }else{
        getDb(function(db_client){
            dodeleteDirectory(db_client,_id,callback);
        });
    }
}
function dodeleteDirectory(dbc, _id, callback){
    var collection = dbc.collection("directory");
    collection.deleteOne({_id:ObjectID.createFromHexString(_id)},function(err,r){
        callback(err,r);
    });
}
exports.deleteDirectory = deleteDirectory;


//编辑目录
function editDirectory(_id,name, callback){
    if(dbClient){
        doeditDirectory(dbClient,_id,name, callback);
    }else{
        getDb(function(db_client){
            doeditDirectory(db_client,_id,name,callback);
        });
    }
}
function doeditDirectory(dbc, _id, name,callback){
    var collection = dbc.collection("directory");
    collection.updateOne({_id: ObjectID.createFromHexString(_id)}, {$set:{name: name}},function(err,r){
        callback(err,r);
    });
}
exports.editDirectory = editDirectory;

//添加目录
function addDirectory(parent,name, callback){
    if(dbClient){
        doaddDirectory(dbClient,parent,name, callback);
    }else{
        getDb(function(db_client){
            doaddDirectory(db_client,parent,name,callback);
        });
    }
}
function doaddDirectory(dbc, parent, name,callback){
    var collection = dbc.collection("directory");
    collection.insertOne({parent: ObjectID.createFromHexString(parent),name: name,timestamp:(new Date()).getTime()},function(err,r){
        callback(err,r);
    });
}
exports.addDirectory = addDirectory;