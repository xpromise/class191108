const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取CSS成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

/*
  pwa 渐进式网络应用

  npm i serve -g
  serve build
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash:8].css",
    }),
    // 使用PWA插件
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: "production",
};
