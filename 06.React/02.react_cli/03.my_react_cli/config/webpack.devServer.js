/*
  开发环境下 devServer 配置文件
*/
const paths = require("./paths");

module.exports = {
  contentBase: paths.appBuild, // 运行（构建后）代码的根目录
  compress: true, // 启动gzip压缩
  port: 3000, // 端口号
  host: "localhost",
  open: true, // 自动打开浏览器
  overlay: false, // 不要webpack错误在浏览器全屏提示
  quiet: true // 不要打包打印信息
  // progress: true, // 进度条提示
};
