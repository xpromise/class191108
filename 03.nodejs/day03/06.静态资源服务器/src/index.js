// 引入http模块
const http = require("http");
const path = require("path");
const fs = require("fs");
/*
  需求：
  访问地址：http://localhost:3000/src
    将src目录下所有文件名返回给客户端
  访问地址：http://localhost:3000/src/index.js
    将index.js返回给客户端 
*/

// 创建服务
const server = http.createServer((req, res) => {
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

  // 分析文件路径，返回一个stats
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // 说明文件在服务器找不到。
      // 设置响应状态码 404
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain;charset=utf8");
      res.end(`${url} 不是一个文件或文件夹`);
      return;
    }

    // 文件找到了，但是还要判断是文件还是文件夹
    if (stats.isDirectory()) {
      // 说明是文件夹, 返回目录下所有文件名
      fs.readdir(filePath, (err, files) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain;charset=utf8");
          res.end(`${url} 不是一个文件或文件夹`);
          return;
        }
        // console.log(files); // [ 'index.js' ]

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain;charset=utf8");
        res.end(files.join(","));
      });

      return;
    }

    if (stats.isFile()) {
      // 说明是文件, 返回当前文件 
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain;charset=utf8");
          res.end(`${url} 不是一个文件或文件夹`);
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/javascript;charset=utf8");
        res.end(data);
      })

      return;
    }
  });

  // 设置响应头（响应报应头部）
  // res.setHeader("Content-Type", "text/plain;charset=utf8");
  // 设置响应体
  // res.end("hello server~");
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
  console.log("服务器启动成功，请访问: " + address);
});
