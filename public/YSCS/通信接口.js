/**
 * Created by weijianli on 2015/7/16.
 */

//向后台提交答案
var queryUrl = "XXXX.php";
var queryData = {
    queryType:"answers",
    answers:[
        {
            tit:"a1",
            answer:"a"
        },
        {
            tit:"a2",
            answer:"b"
        },
        {
            tit:"a3",
            answer:"c"
        },
        {
            tit:"a4",
            answer:"d"
        }
        /*
        .
        .
        .
         */
    ]

};
var reData = {
    error:0,//0:没有错误，1：有错误
    errorMsg:"错误信息描述"
};


//微信配置相关信息，参考http://mp.weixin.qq.com/wiki/3/ecfed6e1a0a03b5f35e5efac98e864b7.html

//1、获取配置信息

var queryUrl = "XXXX.php";

var queryData = {
    url:location.href,//网页的链接地址
    configErr:undefined//configErr有值的时候表示我用获取的信息配置接口出错{可能是过期}，需要从新获取配置信息
};
var reData = {
    signatureJSON_:{
        url:url,//网页的链接地址
        appId:"",//必填，公众号的唯一标识
        noncestr:"KTNW",//生成签名的随机串
        jsapi_ticket:jsapi_ticket,//jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取
        timestamp:(new Date()).getTime()//生成签名的时间戳
    },
    signature_:"signature"//签名
};
