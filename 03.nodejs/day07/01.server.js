const http = require("http");
const querystring = require("querystring");
/*
  同源策略：浏览器安全策略
    规定：
      1. 协议名
      2. 域名/ip地址
      3. 端口号
    要求三者完全一致  
    比如：
      当前前端页面地址是http://localhost:3000，
      我要向服务器http://localhost:5000发送请求，
      此时浏览器就会主动检查前端页面地址和要请求的服务器地址是否符合同源策略
      只要有一个不一样，就是违背同源策略，产生跨域
      只有全部一样，才符合同源策略

  跨域: 违背同源策略
    一旦跨域，客户端就接受不到响应结果，反而报错~
  报错内容：  
    Access to XMLHttpRequest at 'http://localhost:3000/' from 
    origin 'http://127.0.0.1:5500' has been blocked by CORS policy: 
    No 'Access-Control-Allow-Origin' header is present on the requested resource.

  请求：
    普通HTTP请求：网页输入网址、img、script、link、form...  (没有跨域限制，浏览器不会进行同源策略检查)
    特殊HTTP请求: AJAX (就会检查是否跨域)

    只有AJAX请求才存在跨域问题。

  解决跨域办法：
    1. jsonp 民间方案
      利用script标签没有跨域限制的特点，来取代AJAX发送请求
      优点：兼容好
      缺点：只能支持GET请求（因为script只能发送GET请求）

    2. cors 官方方案

*/

const server = http.createServer((req, res) => {
  // 接受请求参数

  const qs = querystring.parse(req.url.split("?")[1]);
  // 'success'
  const callback = qs.callback;

  // 定义要响应的数据
  const person = { name: "jack", age: 18 };
  res.setHeader("Content-Type", "application/javascript;charset=utf8");

  // success('{ "name": "jack", "age": 18 }')
  res.end(`${callback}(${JSON.stringify(person)})`);
});

server.listen(3000, "localhost", err => {
  if (err) {
    console.log("服务器启动失败~", err);
    return;
  }
  console.log("服务器启动成功，http://localhost:3000");
});
