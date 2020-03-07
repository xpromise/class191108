// 引入http模块
const http = require("http");
const path = require("path");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");

// util.promisify 完成将一个普通异步函数封装成基于promise风格的函数，并返回
// 注意：被封装的异步函数的回调函数，第一个参数必须是error（必须符合错误优先机制）
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// 创建服务
const server = http.createServer(async (req, res) => {
  // 处理请求的回调函数
  // 获取请求路径  /src
  const url = req.url;
  // 获取当前程序运行目录
  const root = process.cwd();
  // 组成绝对路径
  const filePath = path.resolve(root, `.${url}`);
  /*
    如果是目录，返回目录下所有文件名
    如果是文件，返回当前文件
  */

  try {
    /*
      里面放置可能出错代码（比如promise对象，可能成功，也可能失败）
      如果全是成功，就全部运行，catch中代码就不会运行
      值要有一个失败，就立即终止try中的代码（后面代码就不会运行了），
      直接来到catch中处理错误
    */

    // 分析文件路径，返回一个stats
    const stats = await stat(filePath);

    // 但是还要判断是文件还是文件夹
    if (stats.isDirectory()) {
      // 说明是文件夹
      // 读取文件夹里面的内容
      const files = await readdir(filePath);

      // 返回响应
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html;charset=utf8");

      /*
        修改了服务器代码，正常需要重启服务器，新代码才会生效（太麻烦了~）
        需求：希望修改了服务器代码，会自动重启。
        解决： 
          1. npm i nodemon -g
          2. nodemon ./src/index.js
          nodemon会自动监视文件，一旦文件发生变化，会自动重启服务器

        需求：希望打印颜色丰富
        解决：
          1. npm init
          2. npm i chalk 
      */

      const lis = files.reduce((p, c) => {
        p += `<li><a href="/${c}">${c}</a></li>`;
        return p;
      }, "");

      const html = `
        <html>
          <body> 
            <ul>
              ${lis}
            </ul> 
          </body>
        </html>
      `;
      res.end(html);
      return;
    }

    if (stats.isFile()) {
      // 说明是文件
      // 读取文件里面的内容
      const data = await readFile(filePath);

      // 返回响应
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript;charset=utf8");
      res.end(data);
      return;
    }
  } catch (e) {
    console.log(e);
    // 说明以上异步方法有一个出错了~
    // 说明文件找不到，返回404
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain;charset=utf8");
    res.end(`${url} 不是一个文件或文件夹`);
  }
});

const port = 3000;
const host = "localhost";
// 启动服务
server.listen(port, host, err => {
  if (err) {
    console.log("服务器启动失败：", err);
    return;
  }
  const address = `http://${host}:${port}`;
  console.log("服务器启动成功，请访问: " + chalk.yellow(address));
});
