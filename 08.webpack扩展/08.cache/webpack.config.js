const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取CSS成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
  1. 文件命名 [name].js
    问题：一旦文件被强制缓存起来，在强制缓存期间内，内容不可更改
  2. 文件命名 [name].[hash:8].js
    让文件名不一样，就不会使用上次文件的强制缓存了
    问题：当你改动样式/js文件，会导致其他没有变化的文件缓存失效
    原因：所有文件共享一个hash值，一旦文件发生变化，就会全部修改
          只要webpack重新打包，即使文件没有变，也会生成新的hash值，导致所有缓存失效
    hash: webpack每次打包都会生成一个唯一的hash值
  3. 文件命名 [name].[chunkhash:8].js      
    chunkhash打包生成的每一个块都有自己唯一的chunkhash
    ./css/main.3ed9a825.css  
    ./js/main.3ed9a825.js  
    ./js/math.3e04080a.chunk.js

    打包生成的JS文件都会有自己的chunkhash
    但是打包生成的样式文件的chunkhash会和入口文件生成main chunk一致
      为什么？css-loader 会将样式文件打包到JS中，此时JS和CSS就成一个chunk啦

    问题：入口文件和样式文件的chunkhash值一样，同样当修改文件内容时，另外文件缓存失效  
  4. 文件命名 [name].[contenthash:8].js  
    contenthash 根据文件内容来生成contenthash，只要文件内容不一样，hash一定不一样

    问题：当你使用动态导入语法对math.js进行代码分割
      一旦修改math.js文件，会导致index.js缓存失效
    原因：index.js中会记录math.js的打包chunkId（contenthash生成的） 
      当math.js文件发生变化（contenthash会改变），
      导致index.js中的math.js的chunkId发生变化，从而导致index.js也变化了（contenthash会改变）
  5. 将所有JS文件记录ID的内容，提取成单独文件runtime.xxx.js
    配置：
      runtimeChunk: {
        name: (entryPoint) => `runtime-${entryPoint.name}`
      }
    当math.js文件发生变化（contenthash会改变），只会导致 runtime.js 文件也发生变化
    而index.js不变
*/

module.exports = {
  // entry: "./src/index.js",  // 等价于下面这种
  entry: {
    main: "./src/index.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块进行处理
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`,
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]会自动补充为文件名
    filename: "./js/[name].[contenthash:8].js",
    chunkFilename: "./js/[name].[contenthash:8].chunk.js", // 分割的非入口文件代码命名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 自动删除上一个打包的结果
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash:8].css",
    }),
  ],
  mode: "development",
};
