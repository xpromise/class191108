/*
  Cookie
    本质上 是存储在客户端的key-value字符串
    安全性较低
  Session
    本质上 是存储在服务器的对象
    安全性较高

    工作流程：
      1. 客户端发送请求到服务端
      2. 服务端保存用户数据到session对象中，生成一个唯一的session_id, 设置成cookie并返回响应
      3. 客户端接受到保存session_id的cookie就会自动存储，下一次发送请求自动携带
      4. 服务端接受cookie，解析得到session_id, 通过session_id去session对象中找到用户数据
        从而鉴别是哪个用户访问，返回相应的响应~
*/

const http = require("http");
// 专门用来解析查询字符串参数
const querystring = require("querystring");

// 保存n个用户数据
/*
  const sessions = [{用户数据}, {}, {}, {}];

  const sessions = {
    session_id: {用户数据}
  }
*/
const sessions = {};

function randomId() {
  return (
    Date.now() +
    Math.random()
      .toString()
      .slice(2)
  );
}

const server = http.createServer((req, res) => {
  /*
    第一次请求地址：http://localhost:3000/login?name=xxx&age=40&sex=男

    第二次请求地址：http://localhost:3000/user
  */

  // /login?name=admin&age=40&sex=男
  // path=/login   qs=name=admin&age=40&sex=男
  const [path, qs] = req.url.split("?");

  if (path === "/login") {
    // 说明第一次请求
    // 解析请求参数，获取用户数据
    const user = querystring.parse(qs);
    // console.log(qs); // { name: 'admin', age: '40', sex: '男' }

    // 生成一个唯一的session_id并保存到session中
    const id = randomId();
    sessions[id] = user;

    // 设置cookie 并 返回响应
    res.setHeader("Set-Cookie", `userId=${id};max-age=3600;httpOnly=true`);
    res.setHeader("Content-Type", "text/plain;charset=utf8");
    res.end("服务器返回响应~");

    return;
  }

  if (path === "/user") {
    // 说明是第二次请求
    // 解析cookie，得到session_id
    const cookies = req.headers.cookie.split("; ").reduce((p, c) => {
      const [key, value] = c.split("=");
      p[key] = value;
      return p;
    }, {});
    const { userId } = cookies;
    // 去session对象中找到相应的用户数据
    const user = sessions[userId];
    res.setHeader("Content-Type", "application/json;charset=utf8");

    res.end(JSON.stringify(user));
  }
});

server.listen(3000, "localhost", err => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  console.log("服务器启动成功~  http://localhost:3000");
});
