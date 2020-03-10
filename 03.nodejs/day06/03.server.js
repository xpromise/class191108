const http = require("http");

const server = http.createServer((req, res) => {
  // 打印GET请求参数
  console.log(req.url);

  // 会产生跨域错误，解决它
  res.setHeader("Access-Control-Allow-Origin", "*");

  // 返回响应
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
