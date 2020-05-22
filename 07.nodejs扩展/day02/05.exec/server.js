const express = require("express");
const path = require("path");
const md5 = require("md5");
// 引入连接数据库模块
require("./db");

const Users = require("./models/users");

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

app.post("/register", async (req, res) => {
  // 处理客户端发送的注册请求
  // 收集用户提交的表单数据
  const { username, password, phone } = req.body;
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
  if (!phone) {
    // 返回错误的响应
    res.json({ code: 10001, msg: "手机号不合法" });
    return;
  }
  try {
    // 检查用户/手机号是否已存在
    const result = await Users.findOne(
      { $or: [{ username }, { phone }] },
      { username: 1, phone: 1, _id: 0 }
    );

    if (result) {
      // 找到了，说明用户名/手机号被注册了~
      const name = username === result.username ? "用户名" : "手机号";
      res.json({ code: 10002, msg: `${name}已被注册，请重新输入` });
      return;
    }

    // 将用户数据存到数据库中
    const user = await Users.create({
      username,
      password: md5(password), // 对密码进行加密
      phone,
    });

    // 返回响应
    res.json({ code: 10000, data: user });
  } catch (e) {
    res.json({ code: 10003, msg: "发生未知故障，请联系管理员" });
  }
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器启动成功~");
});
