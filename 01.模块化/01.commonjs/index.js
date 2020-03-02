/*
  commonjs模块化： 一般用于服务器端（NodeJS）
  语法：
    1. 引入模块
      require(模块路径)
    2. 暴露模块
      exports.xxx = xxx
      module.exports = xxx

  所有模块化都有有一个入口js（主）文件：index.js  main.js  app.js
    作用：负责将其他js模块引入，汇总在一起    
      这样只要使用主模块，那么其他模块就都加载了~
  
  模块内部的数据对外都是私用的（不能访问使用），需要暴露出去，外面才可以使用   
  
  运行node程序的指令： node 文件名
    注意：一定要来到文件所在目录运行，否则找不到文件
*/

// 引入其他模块

// 同步加载add模块，并将add模块暴露的内容作为返回值返回
// 路径省略 ./ 会报错：Error: Cannot find module 'add.js'
const add = require("./add.js");
const sum = require("./sum.js");

console.log(add); // { add: [Function: add] }
console.log(sum); // [Function: sum]

console.log(add.add(1, 2));
console.log(sum(1, 2, 3, 4));



