// 引入http模块
const http = require("http");
const chalk = require("chalk");

// 默认会找middleware下面的index.js
const middleware = require("./middleware");
const { port, host } = require("./config");
const open = require("./utils/open");

// 创建服务
const server = http.createServer(middleware);

// 启动服务
server.listen(port, host, err => {
  if (err) {
    console.log("服务器启动失败：", err);
    return;
  }
  const address = `http://${host}:${port}`;
  console.log("服务器启动成功，请访问: " + chalk.yellow(address));
  // 服务器启动成功后，打开浏览器
  open(address);
});
