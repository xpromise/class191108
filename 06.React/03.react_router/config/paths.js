/*
  包含n个文件/目录绝对路径的模块
*/

const path = require("path");

// 运行项目指令目录
const appDirectory = process.cwd();
// 定义一个处理路径公共方法
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp("src"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.js"),
  appPublic: resolveApp("public"),
  appBuild: resolveApp('build')
};
