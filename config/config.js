var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mine'
    },
    port: 3000,
    dbUrl:'mongodb://localhost:27017/test',
    sessionDb:"session",
    dbHost:"localhost",
    dbPort:"27017"
  },

  test: {
    root: rootPath,
    app: {
      name: 'mine'
    },
    port: 3000,
      dbUrl:'mongodb://localhost:27017/test',
      sessionDb:"session",
      dbHost:"localhost",
      dbPort:"27017"
  },

  production: {
    root: rootPath,
    app: {
      name: 'mine'
    },
    port: 3000,
      dbUrl:'mongodb://localhost:27017/test',
      sessionDb:"session",
      dbHost:"localhost",
      dbPort:"27017"
  }
};

module.exports = config[env];
