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
        console.log(data);
        res.send(data);
    });
});