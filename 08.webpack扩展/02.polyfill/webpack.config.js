const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
  1. 下载
    npm init -y 先初始化package.json 否则后面下载包会删除之前的~
    npm i webpack webpack-cli html-webpack-plugin style-loader css-loader @babel/core babel-loader @babel/preset-env -D
  2. 配置指令
    "start": "webpack"

  3. 配置JS兼容性：babel
    1. @babel/preset-env
      配置：
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      功能：
        只能将一些普通ES6语法转换ES5一下，
        一旦一些较复杂的语法，如Promise、Async等，就不会转化（此时在IE浏览器运行就报错）
      打包后JS文件体积：17.1KB
    2. @babel/polyfill
      下载 npm i @babel/polyfill
      配置 在入口JS文件引入 import '@babel/polyfill';
      功能：所有ES6以上的语法JS兼容包（不包含基本ES6语法）    
      打包后JS文件体积：451KB
      问题：打包的体积太大了，我们只用上一部分ES6高级语法，他却把所有语法兼容性都引入
    3. core-js  
      下载 npm i core-js
      注意 不要在引入@babel/polyfill
      功能：内部会根据使用ES语法，自动加载相应的 polyfill （按需加载）
      打包后JS文件体积：114KB
 */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "./js/built.js",
  },
  module: {
    rules: [
      {
        // 处理样式文件
        test: /\.css$/,
        // 只检测src目录下的文件
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
      },
      {
        // 编译/转化JS语法
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 文档: https://www.babeljs.cn/docs/babel-preset-env#targets
                // 按需加载
                // 需要使用ES6的高级语法，就加载语法对应的polyfill，其他就不加载
                useBuiltIns: 'usage', 
                // 使用兼容性的包，指定版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到什么程度
                // targets: { 
                //   ie: 8,
                //   chrome: 60,
                //   firefox: 50,
                //   safari: 10,
                //   edge: 13
                // }
                // 需要覆盖99.5%的浏览器，但是不要死了的
                // 参考：browserslist
                targets: '>0.5%, not dead',
                // 不要将ES6模块化装化成COMMONJS（cjs）
                modules: false
              }
            ]
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "development",
};
