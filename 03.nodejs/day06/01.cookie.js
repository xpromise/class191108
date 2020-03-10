/*
  http协议：无状态
    cookie 解决http协议无状态
      
    工作流程：
      1. 客户端发送请求到服务器（无状态）
      2. 服务器设置cookie（代表用户唯一标识）并返回响应（有状态）
      3. 客户端接受到响应中的cookie会自动存储
      4. 下一次发送请求到该服务器时，又会自动携带上之前存储的cookie（有状态）
      5. 服务器通过解析客户端发送的cookie，从而判断是哪个用户发送的请求
      （遇到cookie不合法，需要清除）
      6. 最终返回该用户的响应
    
    服务器：
      1. 设置cookie
      2. 获取cookie
      3. 删除cookie
    客户端：
      1. 设置cookie
        document.cookie = 'key=value;max-age=xxx'
      2. 获取cookie
        document.cookie
      3. 删除cookie
        document.cookie = 'key=value;max-age=xxx'
        手动删除 application cookies 删除~

*/

const http = require("http");

const server = http.createServer((req, res) => {
  // 处理请求的回调函数

  // 1. 设置cookie
  /*
    会话cookie（临时cookie）：
    当客户端第一次访问会存储起来，后面请求会自动携带上
    一旦关闭客户端，会话cookie会自动删除
  */

  // res.setHeader("Set-Cookie", "userId=123456;");
  /*
    持久化cookie
      在规定一段时间内，客户端会一直保存，不会删除
  */
  // 设置一个cookie
  // httpOnly=true 该cookie禁止在客户端获取
  res.setHeader("Set-Cookie", "userId=123456;max-age=3600;httpOnly=true");
  // 设置多个cookie
  // res.setHeader("Set-Cookie", [
  //   "userId=123456;max-age=3600",
  //   "test=111;max-age=3600"
  // ]);

  // 2. 获取cookie
  // const cookies = req.headers.cookie;
  // console.log(cookies); // userId=123456; test=111
  // 处理cookie
  // const obj = cookies
  //   .split("; ") // ["userId=123456", "test=111"]
  //   .reduce((p, c) => {
  //     // c "userId=123456"
  //     const [key, value] = c.split("=");
  //     p[key] = value;
  //     return p;
  //   }, {});
  // console.log(obj);

  // 3. 删除cookie
  // res.setHeader("Set-Cookie", "userId=;max-age=0");

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf8");
  res.end("服务器返回的响应~");
});

server.listen(3000, "localhost", err => {
  if (err) {
    console.log("服务器启动失败了~", err);
    return;
  }
  console.log("服务器启动成功~  http://localhost:3000");
});
