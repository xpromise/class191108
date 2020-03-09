// 引入http模块
const http = require("http");
const chalk = require("chalk");

// 默认会找middleware下面的index.js
const middleware = require("./middleware");
// 引入默认配置
const defaultConfig = require("./config");
const open = require("./utils/open");
// 引入命令行配置：将来用户输入 -p -h -d,都会收集并返回一个对象
const argv = require("./cli");
// 合并配置
const config = Object.assign({}, defaultConfig, argv);

const { port, host, root } = config;

// 创建服务
const server = http.createServer(middleware(root));

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
