/*
  代表开发环境启动文件
*/

// 定义环境变量
process.env.NODE_ENV = "development";

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

// 引入devServer配置
const serverConfig = require("../config/webpack.devServer");
// 引入webpack核心配置文件
const configFactory = require("../config/webpack.config");
// 获取开发环境webpack配置
const config = configFactory("development");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, serverConfig);

const port = serverConfig.port;
const host = serverConfig.host;

server.listen(port, host, err => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  console.log(`服务器启动成功 http://${host}:${port}`);
});
