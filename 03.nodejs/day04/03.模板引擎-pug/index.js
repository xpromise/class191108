/*
  npm init
  npm i pug
  使用~
*/
// 引入pug
const path = require("path");
const pug = require("pug");

// 将index.pug编译成html文件

const persons = [
  {name: 'jack', age: 18},
  {name: 'rose', age: 16},
]

const filePath = path.resolve(__dirname, "views/index.pug");
// 将数据渲染到pug中，将pug变成html字符串返回
const html = pug.renderFile(filePath, { persons });

/*
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pug的使用</title>
  </head>
  <body>
  <div class="box" id="box">hello div</div>
  <ul> <li><a href="http://www.atguigu.com">尚硅谷</a></li></ul>
  </body></html>
*/
console.log(html);
