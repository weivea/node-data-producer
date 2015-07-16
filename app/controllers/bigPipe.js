/**
 * Created by weijianli on 2015/6/1.
 */
var express = require('express'),
    router = express.Router(),
    Article = require('../models/article');

module.exports = function (app) {
    app.use('/', router);
};
var datapipe = {
    pid:'dom0',
    htmlCnt:"<div id='dom1' class='bigpipe'>你好，我是采用bigPipe方式渲染的页面~</div>",
    css:'/css/bigpipe.css',
    js:'/js/bigpipepage.js'
};
router.get('/bigpipe', function (req, res, next) {
    var articles = [new Article(), new Article()];
    res.render('bigPipe', {
        title: 'bigPipe'
    },function(err,str){
        res.write(str);
        setTimeout(function(){
            res.write('<script>bigpipe.set("test",'+JSON.stringify(datapipe)+');</script>');
            res.write('<script>bigpipe.set("test",'+JSON.stringify(datapipe)+');</script>');
            res.write('<script>bigpipe.set("test",'+JSON.stringify(datapipe)+');</script>');
            res.end();
        }, 2000);

    });
});
