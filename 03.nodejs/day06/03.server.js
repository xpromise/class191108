const http = require("http");

const server = http.createServer((req, res) => {
  // 打印GET请求参数
  console.log(req.url);

  const contentType = req.headers["content-type"];

  // 接受post请求体参数
  let data = "";

  req
    .on("data", chunk => {
      data += chunk.toString();
    })
    .on("end", () => {
      console.log("接受到了post请求数据", data);
      // {"name":"jack","age":18}
      // 需要将数据转化成js对象
      // console.log(JSON.parse(data));

      if (contentType === "application/json") {
        console.log(JSON.parse(data));
      }

      if (contentType === "application/x-www-form-urlencoded") {
        // name=jack&age=18
        const result = data.split("&").reduce((p, c) => {
          const [key, value] = c.split("=");
          p[key] = value;
          return p;
        }, {});
        // { name: 'jack', age: '18' }
        console.log(result);
      }
    });
  // 会产生跨域错误，解决它
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 返回响应
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf8");
  res.end("服务器返回的响应5555~");
});

server.listen(3000, "localhost", err => {
  if (err) {
    console.log("服务器启动失败了~", err);
    return;
  }
  console.log("服务器启动成功~  http://localhost:3000");
});
