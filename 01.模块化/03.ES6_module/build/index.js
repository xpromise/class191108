"use strict";

var _add = _interopRequireDefault(require("./add"));

var _person = require("./person");

var _math = require("./math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
  ES6模块化 --> 一般用于浏览器端
    1. 引入模块  import
      import xxx from 模块路径
      import { xxx, yyy } from 模块路径
    2. 暴露模块  export 
      export defaut xxx  默认暴露
      export const xxx = xxx 分别暴露
      export { xxx, yyy } 统一暴露

    默认情况下，ES6模块化浏览器是不解析的，会报错：Uncaught SyntaxError: Cannot use import statement outside a module
    
    所以：ES6模块化需要借助工具编译处理（将ES6模块化编译成浏览器能识别的语法）
    
    - babel
      一个编译js的工具：将ES6以上的js语法编译成ES5一下的js语法，从而能让js代码在低版本浏览器运行

      1. 下载安装
        npm init -y
        npm i @babel/core @babel/cli @babel/preset-env -D
      2. 配置
        在package.json中配置：  
          "babel": {
            "presets": [ "@babel/preset-env" ]
          }
      3. 运行指令：
        npx babel src -d build  (将src目录下所有文件编译到build下面去)
          注意：browserify工具只接受一个入口js文件 index.js（因为会自动分析依赖关系从而加载其他模块）
                但是，babel不行，所以需要babel处理哪些文件，就传哪些文件

*/
// 引入其他模块
// 引入默认暴露的模块
// 引入分别暴露的模块(必须对象解构赋值)
// 引入统一暴露的模块(必须对象解构赋值)
console.log((0, _add["default"])(2, 1));
console.log(_person.name, _person.age);
console.log((0, _math.mul)(2, 2));
console.log((0, _math.count)(2, 2));