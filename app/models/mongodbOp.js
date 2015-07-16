/**
 * Created by weijianli on 2015/7/9.
 */
var dbClient = undefined;
var cfg = require("../../config/config.js");
function getDb(callback){
    var mongoClient = require('mongodb').MongoClient;
    mongoClient.connect(cfg.dbUrl, function(err, db) {
        console.log("mongoErr:"+err);
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
                    callback(docs[0]);
                }else{
                    console.log("mongoErr:"+err);
                }
            });
        }else{
            console.log("mongoErr:"+err);
        }

    });
}
exports.getDirectory = getDirectory;