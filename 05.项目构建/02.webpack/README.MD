# webpack

一个静态模块打包器

## 核心概念

1. entry 入口

- 以某个文件为入口开始打包

2. output 输出

- 打包后资源输出到哪里去

3. loader 加载器

- webpack 本身只能识别 json、js 模块，其他模块一旦加载就会报错
- 需要借助 loader 帮助 webpack 识别它识别不了的模块

4. plugins 插件

- loader 功能有限，要想做功能更加强大的工作交给插件

5. mode

- 模式：开发环境（development）和生产环境（production）

## 下载安装

- npm i webpack webpack-cli -g
- npm init -y
- npm i webpack webpack-cli -D

## 直接使用

- 运行 webpack 指令：`webpack ./src/js/index.js -o ./dist/js/index.js --mode=development`
  - 以 webpack 的开发环境运行，处理 ./src/js/index.js 文件，输出到 ./dist/js/index.js
  - 功能
    - 能将 ES6 模块化编译成浏览器识别的语法

- 运行 webpack 指令：`webpack ./src/js/index.js -o ./dist/js/index.js --mode=production`
  - 能将 ES6 模块化编译成浏览器识别的语法
  - 压缩 js 代码

- 问题：
  - 不能识别其他模块（less\css\html\jpg...）

## 通过配置文件使用
