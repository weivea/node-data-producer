/**
 * Created by weijianli on 2015/6/1.
 */
var Bigpipe=function(){
    this.callbacks={};
    this.cssName = '-';
    this.jsName = '-';
}

Bigpipe.prototype.ready=function(key,callback){
    if(!this.callbacks[key]){
        this.callbacks[key]=[];
    }
    this.callbacks[key].push(callback);
};

Bigpipe.prototype.set=function(key,data){
    var callbacks=this.callbacks[key]||[];
    for(var i=0;i<callbacks.length;i++){
        callbacks[i].call(this,data);
    }
};

Bigpipe.prototype.fillHTML = function(pid,innerHtml){
    document.querySelector("#"+pid).innerHTML = innerHtml;
};

Bigpipe.prototype.loadCss = function(path){
    if(!path || path.length === 0){
        throw new Error('argument "path" is required !');
    }
    if(this.cssName.indexOf('-'+path+'-') == -1){
        this.cssName += (path+"-");
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
};

Bigpipe.prototype.loadJs = function(path){
    if(!path || path.length === 0){
        throw new Error('argument "path" is required !');
    }
    if(this.jsName.indexOf('-'+path+'-') == -1){
        this.jsName += (path+"-");
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        body.appendChild(script);
    }
};
