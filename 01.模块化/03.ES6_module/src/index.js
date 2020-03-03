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
import add from "./add";
// 引入分别暴露的模块(必须对象解构赋值)
import { name, age } from "./person";
// 如果不用对象解构赋值，获取的是undefined
// import person from "./person";
// 引入统一暴露的模块(必须对象解构赋值)
import { mul, count } from "./math";

console.log(add(2, 1));
console.log(name, age);
console.log(mul(2, 2));
console.log(count(2, 2));
