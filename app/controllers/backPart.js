/**
 * Created by weijianli on 2015/7/9.
 */
var express = require('express'),
    router = express.Router();
var mongoFun = require("../models/mongodbOp.js");

module.exports = function (app) {
    app.use('/', router);
};

router.get('/backpart', function (req, res, next) {
    mongoFun.getDirectory(function(data){
        console.log(data);
        res.redirect('/backpart/app/index.html');
    });
});
router.get('/directory', function (req, res, next) {
    mongoFun.getDirectory(function(data){
        //console.log(data);
        res.send(data);
    });
});

router.post('/opDirectory', function (req, res, next) {
    if(req.body.operation == "delete"){
        mongoFun.deleteDirectory(req.body._id,function(err,r){
            res.send({error:err});
        });
    }else if(req.body.operation == "edit"){
        mongoFun.editDirectory(req.body._id,req.body.name,function(err,r){
            res.send({error:err});
        })
    }else if(req.body.operation == "add"){
        mongoFun.addDirectory(req.body.parent, req.body.name, function(err,r){
            res.send({error:err});
        })
    }

});

router.get('/getData', function (req, res, next) {
    var repData = {
        key:req.query.key
    };
    mongoFun.findData(repData,function(err,r){
        res.send({error:err,data:r});
    })
});

router.post('/saveDataBlock', function (req, res, next) {
    var upData = req.body.dataBlock;
    mongoFun.updataDataBlock(upData,function(err,r){
        res.send({error:err,data:r});
    })
});


router.post('/insertDataBlock', function (req, res, next) {

    var inData = req.body.dataBlock;
    mongoFun.insertData(inData,function(err,r){
        res.send({error:err});
    })
});

router.post('/delDataBlock', function (req, res, next) {
    var _id = req.body._id;
    mongoFun.delDataBlock(_id,function(err,r){
        res.send({error:err});
    })
});

