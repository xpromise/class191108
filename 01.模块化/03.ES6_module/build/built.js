(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function add(x, y) {
  return x + y;
} // 默认暴露 --> 只能暴露一个内容


var _default = add;
exports["default"] = _default;
},{}],2:[function(require,module,exports){
"use strict";

var _add = _interopRequireDefault(require("./add"));

var _person = _interopRequireDefault(require("./person"));

var _math = _interopRequireDefault(require("./math"));

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

      实际上：将ES6模块化编译成commonjs模块化

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
    
    - browserify
      将commonjs模块化编译成浏览器能识别的模块化
      
      npx browserify build/index.js -o build/built.js

*/
// 引入其他模块
// 引入默认暴露的模块
// 引入分别暴露的模块(必须对象解构赋值)
// 引入统一暴露的模块(必须对象解构赋值)
console.log((0, _add["default"])(2, 1));
console.log(_person["default"]);
console.log(_math["default"]); // console.log(name, age);
// console.log(mul(2, 2));
// console.log(count(2, 2));
},{"./add":1,"./math":3,"./person":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mul = mul;
exports.count = count;

function mul(x, y) {
  return x * y;
}

function count(x, y) {
  return x - y;
} // 统一暴露 --> 暴露多项内容（后面跟对象）
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setName = setName;
exports.age = exports.name = void 0;
// 分别暴露 --> 后面接完整表达式
var name = 'jack';
exports.name = name;
var age = 18;
exports.age = age;

function setName() {}

;
},{}]},{},[2]);
