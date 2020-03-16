/*
  webpack配置文件

  
*/
const { resolve } = require("path");

module.exports = {
  // entry
  entry: "./src/js/index.js",
  // output
  output: {
    path: resolve(__dirname, "build"), // 输出目录
    filename: "build.js" // 输出文件名
  },
  // loader
  module: {
    rules: [
      // 所有loader的配置
      {
        // 检查是否是less文件
        // npm i less less-loader style-loader css-loader -D
        test: /\.less$/,
        // 如果满足test要求，文件就会通过use来处理
        use: [
          // use数组执行顺序：从下到上、从右往左
          {
            loader: "style-loader" // 从js文件中找到css字符串，并创建style标签插入页面中
          },
          {
            loader: "css-loader" // 将 CSS 转化成 字符串，会以 CommonJS 模块化整合js文件中
          },
          {
            loader: "less-loader" // 将 Less 编译成 CSS
          }
        ]
      }
    ]
  },
  // plugins
  // mode
  mode: "development" // 开发环境
};
