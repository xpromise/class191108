/*
  代表开发环境启动文件
*/

// 定义环境变量
process.env.NODE_ENV = 'development';

// 引入webpack核心配置文件
const configFactory = require('../config/webpack.config');

configFactory('development');