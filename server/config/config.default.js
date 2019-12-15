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
    whitelist: [
      '.rar',
      '.zip',
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ],
  };
  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  exports.static = {
    prefix: '/public/',
    dir: ['../public']// 多静态文件入口
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
