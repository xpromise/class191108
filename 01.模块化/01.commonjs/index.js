/*
  commonjs模块化： 一般用于服务器端（NodeJS）
  语法：
    1. 引入模块
      require(模块路径)
        - 自定义模块（用户自己写的模块 add.js  sum.js）
          模块路径必须以 ./ 或 ../ 开头
        - 第三方模块（别人写的模块 jquery.js）nodejs自带核心模块，通过npm下载的第三方模块
          模块路径直接写模块名称即可

        模块路径时，可以省略文件后缀名 .js .json .node
    2. 暴露模块
      exports.xxx = xxx
      module.exports = xxx

      面试题：模块暴露的本质？exports和module.exports的区别？
        模块暴露的本质：向外暴露的是module.exports的值，和exports没关系
          exports是module.exports一个引用
        
          module.exports = {};
          exports = module.exports;
        
        一般只用 module.exports
          暴露一个内容 module.exports = xxx
          暴露多个内容 module.exports = { xxx, yyy }


  所有模块化都有有一个入口js（主）文件：index.js  main.js  app.js
    作用：负责将其他js模块引入，汇总在一起    
      这样只要使用主模块，那么其他模块就都加载了~
  
  模块内部的数据对外都是私用的（不能访问使用），需要暴露出去，外面才可以使用   
  
  运行node程序的指令： node 文件名
    注意：一定要来到文件所在目录运行，否则找不到文件
*/

// 引入其他模块

// nodejs的核心模块
const path = require("path");
/* 
  通过npm下载模块  
     --> 
     npm init -y   生成一个package.json（目录不能有中文、大写、特殊字符）
     npm i jquery  下载jquery模块
        下载速度很慢，就配置淘宝镜像再下载  npm config set registry https://registry.npm.taobao.org
*/
const $ = require("jquery");

// 同步加载add模块，并将add模块暴露的内容作为返回值返回
// 路径省略 ./ 会报错：Error: Cannot find module 'add.js'
const add = require("./add");
const sum = require("./sum");

console.log(add); // { add: [Function: add] }
console.log(sum); // [Function: sum]

// console.log(add.add(1, 2));
// console.log(sum(1, 2, 3, 4));

// console.log(path);
// console.log($);
