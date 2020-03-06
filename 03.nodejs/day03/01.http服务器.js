/*
  Http 
    既能搭建服务器，也能客户端
      服务器：接受请求、处理请求、返回响应
      客户端：发送请求，接受响应

      1. 通过指令运行服务器
        node xxx
      2. 通过 http://localhost:3000 访问服务器
      3. 一旦访问服务器，服务器就会通过 http.createServer(callback) 中 callback 处理请求
      4. res.end("hello server~"); 来返回响应~

      注意：修改了服务器代码，一定要重启服务器才能生效~ （终止之前运行服务器，重新启动服务器）
*/
// 引入http模块
const http = require("http");

// 创建服务
const server = http.createServer((req, res) => {
  /*
    request 请求对象：客户端发送给服务器的数据
    response 响应对象：服务器发送给客户端的数据
  */
  // 处理请求
  // 返回响应
  // res.setHeader("Content-Type", "text/plain;charset=utf8");
  res.setHeader("Content-Type", "text/html;charset=utf8");
  // res.end("hello server~");
  // res.end("你好，旅客~");
  res.end("<h1>你好，旅客~</h1>");
});

// 端口号
const port = 3000;
// 主机名 / 域名
// const host = "localhost"; // 域名
const host = "127.0.0.1"; // ip地址
// 启动服务
server.listen(port, host, err => {
  if (err) {
    console.log("服务器启动失败了", err);
    return;
  }
  // 访问服务器地址： http://localhost:3000
  const address = `http://${host}:${port}`;
  console.log(`服务器启动成功了~ 访问服务器地址：${address}`);
});
