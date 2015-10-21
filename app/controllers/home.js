var express = require('express'),
    router = express.Router();
var mongoFun = require("../models/mongodbOp.js");

module.exports = function (app) {
    app.use('/', router);
};



router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'weiveaPage'
    },function(err,html){
        res.write(html);
        res.write('<script>bigpipe.set("directory",'+JSON.stringify({data:'test'})+');</script>');
        res.end();
    });

});
/*
router.get('/backpart', function (req, res, next) {
    mongoFun.getDirectory(function(data){
        console.log(data);
        res.sendfile('public/backpart/app/index.html');
    });
});*/
