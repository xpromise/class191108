// 引入http模块
const http = require("http");
const path = require("path");
const fs = require("fs");
const util = require("util");
/*
  需求：
  访问地址：http://localhost:3000/src
    将src目录下所有文件名返回给客户端
  访问地址：http://localhost:3000/src/index.js
    将index.js返回给客户端 
*/

//#region 封装promise代码
/* function stat(filePath) {
  // 将来遇到异步代码，如果是promise，就不处理
  // 如果不是promise，就要封装promise风格
  // 默认是promise状态是初始化状态
  // 当异步操作做成功的，改成成功状态并返回数据
  // 当异步操作做失败的，改成失败状态并返回错误
  // 这样，外面通过判断promise对象的状态就能知道异步操作是成功/失败
  return new Promise((resolve, reject) => {
    // 执行异步操作
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

function readdir(filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
*/
//#endregion

// util.promisify 完成将一个普通异步函数封装成基于promise风格的函数，并返回
// 注意：被封装的异步函数的回调函数，第一个参数必须是error（必须符合错误优先机制）
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  };
}

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
      res.setHeader("Content-Type", "text/plain;charset=utf8");
      res.end(files.join(","));
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
  console.log("服务器启动成功，请访问: " + address);
});
