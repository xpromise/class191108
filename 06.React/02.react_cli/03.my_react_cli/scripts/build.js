/*
  代表生产环境启动文件
*/

// 定义环境变量
process.env.NODE_ENV = "production";

const webpack = require("webpack");
// 引入webpack核心配置文件
const configFactory = require("../config/webpack.config");

const config = configFactory("production");

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.log("webpack构建打包失败", err);
    return;
  }
  console.log("webpack构建打包成功", stats);
});
