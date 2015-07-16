/**
 * Created by weijianli on 2015/5/14.
 */
var express = require('express'),
    router = express.Router();
var env = require('jsdom').env;
var jquery =  require('jquery');
var html = '<html><head></head><body style="position: relative"></body></html>';
var autoPageCnt = '';
module.exports = function (app) {
    app.use('/', router);
};

var pageCntData = {
    dom1:{
        htmlCnt:"<div id='dom1' style='width: 300px;height: 300px;position: absolute;background-color: cornflowerblue;'></div>",
        styles:'{"color":"#ff0011","background":"blue","top":"200px","left":"300px"}',
        childrens:'你好，我是第一个模块'
    },
    dom2:{
        htmlCnt:"<div id='dom2' style='width: 300px;height: 300px;position: absolute;background-color: cornflowerblue;'></div>",
        styles:'{"color":"#ff0011","background":"blue","top":"700px","left":"100px"}',
        childrens:{
            dom21:{
                htmlCnt:"<div id='dom21' style='width: 100px;height: 100px;position: absolute;background-color: cornflowerblue;'></div>",
                styles:'{"color":"#ff0011","background":"white","top":"100px","left":"100px"}',
                childrens:'你好，我是第3个模块'
            }
        }
    }
};
var $;
var curDom_P;
function makePage(Data, callback){
    env(html, function (errors, window){
        $ = jquery(window);
        curDom_P = $("body");
        parsePageData(Data, curDom_P);
        console.log($("body").html());
        callback($("body").html());
    });
}
function parsePageData(data, curDom){
    var cc = 0;
    for(var key in data){

        curDom.append(data[key].htmlCnt);
        curDom.children().eq(cc).css(JSON.parse(data[key].styles));
        console.log(isEmptyJSON( data[key].childrens ));

        if((typeof data[key].childrens) == 'string'){
            curDom.children().eq(cc).append(data[key].childrens);
        }else if(!!data[key].childrens && !isEmptyJSON( data[key].childrens )){
            //curDom = curDom.children().eq(cc);
            parsePageData(data[key].childrens, curDom.children().eq(cc));
        }
        cc++;
    }
}



router.get('/auto', function (req, res, next) {

    makePage(pageCntData, function(autoPageCnt){
        res.render('auto', {
            title: '自动生成页面',
            autoPageCnt: autoPageCnt
        });
    });
});

function isEmptyJSON( obj ) {
    for ( var name in obj ) {
        return false;
    }
    return true;
}