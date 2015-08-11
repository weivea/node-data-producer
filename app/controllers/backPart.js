/**
 * Created by weijianli on 2015/7/9.
 */
var express = require('express'),
    router = express.Router();
var mongoFun = require("../models/mongodbOp.js");

module.exports = function (app) {
    app.use('/', validUser);
    app.use('/', router);
};

function validUser(req, res, next){

    if(req.session.userData){//已登录的，放行
        next();
    }else {
        if(req.originalUrl.indexOf("/db/") != -1){//未登录的，要访问数据，返回未登录
            res.send({error:"未登录"});
        }else{
            next();//其它放行
        }
    }



}


router.get('/backpart', function (req, res, next) {
    mongoFun.getDirectory(function(data){
        console.log(data);
        res.redirect('/backpart/app/index.html');
    });
});

router.post('/login/loginPost', function (req, res, next){

    mongoFun.checkUser(req.body.userName,function(err,user){
        console.log(user);
        if(!user){
            res.send({error:"用户不存在"});
        }else{
            if(user.pass != req.body.password){
                res.send({error:"密码不正确"});
            }else{
                req.session.userData = {_id:user._id,level:user.level,userName:user.userName};
                res.send({_id:user._id,level:user.level,userName:user.userName});
            }
        }
    });
});

router.post('/login/logoutPost', function (req, res, next){
    if(req.session.userData){
        req.session.userData = null;
    }
    res.send({msg:"退出成功！"})
});
router.post('/login/getLoginedUser', function (req, res, next){
    if(req.session.userData){
        res.send(req.session.userData);
    }else{
        res.send({error:"还未登陆！"})
    }

});


router.get('/db/directory', function (req, res, next) {
    mongoFun.getDirectory(function(data){
        //console.log(data);
        res.send(data);
    });
});

router.post('/db/opDirectory', function (req, res, next) {
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

router.get('/db/getData', function (req, res, next) {
    var repData = {
        key:req.query.key
    };
    mongoFun.findData(repData,function(err,r){
        res.send({error:err,data:r});
    })
});

router.post('/db/saveDataBlock', function (req, res, next) {
    var upData = req.body.dataBlock;
    mongoFun.updataDataBlock(upData,function(err,r){
        res.send({error:err,data:r});
    })
});


router.post('/db/insertDataBlock', function (req, res, next) {

    var inData = req.body.dataBlock;
    mongoFun.insertData(inData,function(err,r){
        res.send({error:err});
    })
});

router.post('/db/delDataBlock', function (req, res, next) {
    var _id = req.body._id;
    mongoFun.delDataBlock(_id,function(err,r){
        res.send({error:err});
    })
});

