/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562419431187_7638';

  // add your middleware config here
  config.multipart = {
    mode: 'file',
  };
  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cluster = {
    listen: {
      port: 8081,
    }
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  }
  config.security = {
    csrf: {
      enable: false,
    },
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    password: 'admin',
    username: 'root',
    timezone: '+08:00'
  };
  return {
    ...config,
    ...userConfig,
  };
};
