/*
  path 路径
    专门用来出来路径问题
    path.relative(from, to) 用来处理相对路径
      处理from到to的相对路径
    path.resolve([...paths]) 用来处理绝对路径
  
  Buffer和process是global全局变量，所以可以直接使用
  而nodejs其他模块，不需要下载，只需要引入才能使用  
*/
const path = require('path');

// console.log(path.relative('./public', 'index.html')); // ..\index.html

console.log(path.resolve('index.html')); // C:\Users\XiongJian\Desktop\class191108\03.nodejs\day02\index.html

// 需求：在path.js文件，获取process.js文件的绝对路径
// const dirname = __dirname;
// console.log(path.resolve(__dirname, '02.process.js')); // C:\Users\XiongJian\Desktop\class191108\03.nodejs\day02\02.process.js

// 需求：在path.js文件，获取git.md文件的绝对路径
console.log(path.resolve(__dirname, '../../', '02.作业&笔记/', '笔记/git.md'));