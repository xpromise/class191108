// 引入express
const express = require("express");
// 创建APP应用对象：APP包含express框架核心功能
const app = express();

// 处理请求的功能 - 路由
app.get("/", (request, response) => {
  /*
    request 请求对象
    response 响应对象
  */
  console.log(111);
  // 返回响应
  response.end("success111~~~");
});
/*
  get 代表请求方式
  /login 代理请求路径
*/
app.get("/login", (request, response) => {
  console.log(222);
  // 返回响应
  response.end("success222~~~");
});
/*
  post 代表请求方式
  /register 代理请求路径
*/
app.post("/register", (request, response) => {
  console.log(333);
  // 返回响应
  response.end("success333~~~");
});

// 监听端口号，启动服务
app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败:", err);
    return;
  }

  console.log("服务器启动成功，请访问：http://localhost:9527");
});
