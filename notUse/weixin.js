var express = require('express'),
    router = express.Router();
var https = require("https");


function getWeixinToken(callback){
    var aurl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4f7385897534762d&secret=cb8b0d32e69e44e71facf79abe95208f';
    var mdata = '';
    https.get(aurl, function(res) {
        res.on('data', function (chunk) {
            mdata += chunk;
        });
        res.on("end", function() {
            console.log(mdata);
            if((typeof mdata) == 'string'){
                mdata = JSON.parse(mdata);
            }
            callback(mdata.access_token);

        });
    }).on("error", function() {
        //callback(null);
    });
}
function getJsapi_ticket(callback){
    getWeixinToken(function(ACCESS_TOKEN){
        var aurl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN+'&type=jsapi';
        var mdata = '';
        https.get(aurl, function(res) {
            res.on('data', function (chunk) {
                mdata += chunk;
            });
            res.on("end", function() {
                console.log(mdata);
                //Jsapi_ticket = mdata;
                if((typeof mdata) == 'string'){
                    mdata = JSON.parse(mdata);
                }
                callback(mdata.ticket);
            });
        }).on("error", function() {
            //callback(null);
        });
    });
}
//var sha1 = require("./jssha");

var jsSHA = require('./../app/controllers/jssha/src/sha');


var signatureJSON =null,signature=null;
function makeSignature(url,callback){
    getJsapi_ticket(function(jsapi_ticket){
        signatureJSON={
            url:url,
            noncestr:"KTNW",
            jsapi_ticket:jsapi_ticket,
            timestamp:Math.floor((new Date()).getTime()/1000+7000)
        };
        var signatureString = "jsapi_ticket="+signatureJSON.jsapi_ticket+"&noncestr="+signatureJSON.noncestr+"&timestamp="+signatureJSON.timestamp+"&url="+signatureJSON.url;
        var shaObj = new jsSHA(signatureString, 'TEXT');
        signature = shaObj.getHash('SHA-1', 'HEX');

        callback(signatureJSON,signature);
    });
}
function getSignature(url,callback){
    signatureJSON.url = url;
    var signatureString = "jsapi_ticket="+signatureJSON.jsapi_ticket+"&noncestr="+signatureJSON.noncestr+"&timestamp="+signatureJSON.timestamp+"&url="+signatureJSON.url;
    //signature = sha1.hex(signatureString);
    var shaObj = new jsSHA(signatureString, 'TEXT');
    signature = shaObj.getHash('SHA-1', 'HEX');

    callback(signatureJSON,signature);

}


module.exports = function (app) {
    app.use('/', router);
};



router.get('/weixin', function (req, res, next) {

    /*if(req.query.configErr){
        makeSignature(req.query.url,function(signatureJSON_, signature_){
            res.send({
                signatureJSON:signatureJSON_,
                signature:signature_
            });
        });
    }else{
        if(signature){
            getSignature(req.query.url,function(signatureJSON_, signature_){
                res.send({
                    signatureJSON:signatureJSON_,
                    signature:signature_
                });
            });
        }else{
            makeSignature(req.query.url,function(signatureJSON_, signature_){
                res.send({
                    signatureJSON:signatureJSON_,
                    signature:signature_
                });
            });
        }
    }*/
    res.send({
    aaa:"aaa"
    });


    //res.end();
});
