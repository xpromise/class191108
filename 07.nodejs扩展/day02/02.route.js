const express = require("express");

const app = express();

// 设置路由
/*
  路由 route
  前端路由：key-value映射关系，key是路由路径 value是组件
  后端路由：key-value映射关系，key是路由路径 value是回调函数
  1. 是什么？
    key-value映射关系，key是路由路径 value是回调函数
  2. 有什么作用？
    定义请求地址  
    接受请求，处理请求，返回响应
  3. 组成
    请求方式：GET(查) POST(增) PUT(改) DELETE(删)
    请求路径：
      一对一的关系：
      '/xxx' --> http://localhost:9527/xxx

      一对多的关系：
      带参数的地址。 这种参数叫做params参数
      '/product/:id' --> 
          http://localhost:9527/product/1
          http://localhost:9527/product/2

    回调函数（句柄函数）：(request, response) => {}
      request（req） 请求对象：代表客户端发送给服务端的数据
        get请求 
          查询字符串参数（query参数） req.query
          params参数 req.params
        post请求
          请求体参数(body参数)  req.body(默认不能解析)
        token令牌：
          cookie token: xxx   req.cookies(默认不能解析)
          作为请求头的字段 Authorization: Bearer token  req.headers.authorization

      response(res) 响应对象：代表服务端响应给客户端的数据
        res.end(英文字符串)  返回响应：快速返回响应（对响应不做任何处理，直接返回）
        res.send(中文字符串) 返回响应：会对响应数据做一些处理，再返回响应
        res.json(对象/数组) 返回响应：会将响应数据转化成JSON字符串返回响应
        res.redirect(新网址) 返回响应：返回302状态码的响应，使客户端重新访问新的地址（重定向）
        res.download(文件绝对路径) 返回响应：客户端会自动下载文件
        res.sendFile(文件绝对路径) 返回响应：客户端会自动打开文件
        res.status(响应状态码) 设置响应状态码
        res.set(key, value) 设置响应头
        res.cookie(key, value, options) 设置cookie

        注意：
          返回响应只能一次（返回多次会报错）
          返回响应代码的下面不能有任何其他代码（返回响应就代表服务器已经处理完了请求，下面代码就没有任何意义了~）
*/
app.get("/", (request, response) => {
  response.send("服务器返回响应~~~");
});

app.post("/product/:id", (request, response) => {
  // 如何获取params参数
  console.log('params:', request.params); 
  console.log('query:', request.query); 
  console.log('body:', request.body); // 默认情况下，express不解析body参数
  console.log('token:', request.headers.authorization); // 默认情况下，express不解析body参数

  response.end("success~");
});

app.post("/xxx", (request, response) => {
  response.end("success~");
});

app.put("/xxx", (request, response) => {
  response.end("success~");
});

app.delete("/xxx", (request, response) => {
  response.end("success~");
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败:", err);
    return;
  }

  console.log("服务器启动成功，请访问：http://localhost:9527");
});
