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

- webpack.config.js webpack 的配置文件

## 常见错误

错误一般只分析前面几行~

- `Module not found: Error: Can't resolve 'style-loader' in 'C:\Users\XiongJian\Desktop\class191108\05.项目构建\02.webpack'`
  - style-loader 模块没有找到
  - 下载安装：npm i style-loader -D
- `Error: Cannot find module 'less'`
  - less 模块没有找到
  - 下载安装：npm i less -D
- `xxx is not define`
  - 说明 xxx 没有定义
  - 定义或者引入

## 指令

- webpack 和 webpack-dev-server 的区别

  - 只有 webpack-dev-server 才能启动 devServer 配置，而 webpack 不行
  - webpack-dev-server 是在内存中构建，没有输出。 webpack 会有输出到 build 下面
  - 简单理解：
    - webpack 用于生产环境（会输出代码）
    - webpack-dev-server 用于开发环境（不会输出代码）

- npm 和 npx 的区别

  - npm 对包进行管理（下载、上传、删除..）
  - npx 运行本地安装包的指令
    - 当我们下载包时，有些包会将运行的脚本添加到 node_modules/.bin 目录中
    - 运行 npx 时，会将 node_modules/.bin 临时添加为环境变量
    - 所以 node_modules/.bin 下面 cmd 程序就可以当作指令运行

- package.json

```json
// 启动项目的指令
"scripts": {
    // npm start
    // 在scripts指令运行，会将node_modules/.bin临时添加为环境变量
    "start": "webpack-dev-server --config ./config/webpack.dev.js",
    // 除了start，其余指令都得加 run
    // npm run build
    "build": "webpack --config ./config/webpack.prod.js"
  },
```
