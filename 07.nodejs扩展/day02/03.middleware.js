const express = require("express");
const path = require("path");

const app = express();

/*
  中间件 middleware
  1. 是什么？ 本质上就是一个函数，中间件函数
  2. 作用
    执行任何代码。
    修改req和res对象。
    处理请求，返回响应。
    调用堆栈中的下一个中间件（调用下一个中间件函数）。
  3. 组成 (req, res, next) => {}
    req 请求对象
    res 响应对象
    next 调用下一个中间件函数的方法

  启动服务器指令：
    1. node 文件名  
      缺点：一旦服务器内容发生变化，就要先ctrl+c终止服务器，在重新node 文件名启动服务器
          太麻烦了
    2. nodemon 文件名
      nodemon 是一个指令，需要全局安装
      npm i nodemon -g
      优点：会自动监视文件的变化，一旦发生变化，会自动重启服务器，从而服务器代码是最新的

    默认情况下，中间件只会执行一个

    4. 路由和中间件的执行顺序
       一旦服务器接收到请求，会从前到后（从上到下）依次遍历所有路由和中间件。
       默认情况下，只会执行一个匹配上的路由/中间件函数。
       如何匹配上呢？
          如果是路由，必须满足两个条件：请求方式和请求路径一致
          如果是中间件，就立即执行
       有没有可能执行多个？ 在内部调用next方法，就会执行下一个中间件函数
    
    5. 应用
      应用层中间件
      路由器级中间件
      错误处理中间件
      内置中间件
        express.static(资源目录) 向外暴露静态资源
        express.json() 解析请求体参数 application/json
        express.urlencoded() 解析请求体参数 application/x-www-form-urlencoded
      第三方中间件   
*/
// 将public里面的所有资源向外暴露出去，外面就可以直接访问
app.use(express.static(path.resolve(__dirname, 'public')));

// 解析请求体参数 application/x-www-form-urlencoded
// const middleware = express.urlencoded({ extended: true });
// app.use(middleware);
app.use(express.urlencoded({ extended: true }));
// 解析请求体参数 application/json
app.use(express.json());

// app.use((req, res, next) => {
//   next();
// });

app.post("/", (req, res) => {
  // 默认是不解析请求体参数
  console.log("body参数: ", req.body); // { name: 'jack', age: '18' }
  res.send("服务器返回响应~");
});

//#region
// 中间件
// 能够接受所有类型和地址的请求
/* app.use((req, res, next) => {
  console.log(111);
  console.log(222);
  next(); // 调用下一个中间件函数（一般最为最后一条可执行语句）
});

app.use((req, res, next) => {
  console.log(333);
  console.log(444);
  next(); // 调用下一个中间件函数
});

app.use((req, res, next) => {
  console.log(555);
  res.send("服务器返回响应~");
}); */
//#endregion

// 中间件一旦匹配上就执行
/* app.use((req, res, next) => {
  console.log(111);
  next();
});

// 路由要想执行，必须满足两个条件：请求方式和请求路径一致
app.get("/", (req, res, next) => {
  console.log(222);
  next();
});

app.use((req, res, next) => {
  console.log(333);
}); */

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败:", err);
    return;
  }

  console.log("服务器启动成功，请访问：http://localhost:9527");
});
