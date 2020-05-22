const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secret = "WkZ!IW*f5%wS1P3z";

app.get("/sign", (request, response) => {
  const { username } = request.query;
  // 使用jwt派发签名
  jwt.sign(
    { username }, // 需要加密的数据
    secret, // 参与加密的秘钥
    {
      expiresIn: "7d", // 过期时间7天
      // expiresIn: "10000", // 过期时间10s
    },
    (err, token) => {
      if (err) {
        console.log("加密失败", err);
        response.send("加密失败");
        return;
      }

      console.log("加密成功", token);
      response.send(token);
    }
  );
});

app.get("/verify", (request, response) => {
  const { token } = request.query;

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      console.log("解密失败", err);
      response.send("解密失败");
      return;
    }

    console.log("解密成功", data);
    response.send(data);
  });
});

// 监听端口号，启动服务
app.listen(3000, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败:", err);
    return;
  }

  console.log("服务器启动成功，请访问：http://localhost:9527");
});
