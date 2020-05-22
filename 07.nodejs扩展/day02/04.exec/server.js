const express = require("express");
const path = require("path");
const app = express();

// 向外暴露静态资源
app.use(express.static(path.resolve(__dirname, "public")));
// 解析请求体数据
// app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 设置路由
app.post("/login", (req, res) => {
  // 处理客户端发送的登录请求
  // 收集用户提交的表单数据
  // console.log(req.body); // { username: 'admin', password: '123123' }
  const { username, password } = req.body;
  // 判断数据是否合法
  if (!username) {
    // 返回错误的响应
    res.json({ code: 10001, msg: "用户名不合法" });
    return;
  }
  if (!password) {
    // 返回错误的响应
    res.json({ code: 10001, msg: "密码不合法" });
    return;
  }
  // 返回响应
  res.json({ code: 10000, data: {} });
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器启动成功~");
});
