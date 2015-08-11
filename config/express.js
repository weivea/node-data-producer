var express = require('express');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');
var hbshelpers= require('./hbsHelpers');
var session = require('express-session');
var mongoStore = require("connect-mongo")(session);
module.exports = function(app, config) {
  app.engine('.html', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/'],
    extname: '.html',
    helpers:hbshelpers

    /*{
      foo: function (value) { return 'FOO!'; },
        bar: function (value) { return 'BAR!'; }
    }*/
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', '.html');

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
    app.use(favicon(config.root+'/public/favicon.ico'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
    app.use(cookieParser());
    app.use(session({
        secret: 'weivea',
        name: 'weiveaSID',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是1天，即1天后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true,
        store:new mongoStore({
            db:config.sessionDb,
            host:config.dbHost,
            port:config.dbPort
        })
    }));


  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
