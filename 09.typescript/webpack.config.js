const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/*
  npm i webpack webpack-cli webpack-dev-server html-webpack-plugin ts-loader style-loader css-loader typescript -D
*/

module.exports = {
  // 模式
  mode: "development",
  // 入口
  entry: "./src/index.ts",
  // 输出
  output: {
    path: undefined,
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: "/",
  },
  // loader
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 插件
  plugins: [
    // 处理Html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // HMR功能插件
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`,
    },
  },
  resolve: {
    // 自动补全文件扩展名
    extensions: [".ts", ".js", ".json"],
  },
  devServer: {
    compress: true, // 开启gzip压缩
    contentBase: path.resolve(__dirname, "public"),
    host: "localhost",
    port: 9527,
    open: true, // 自动打开浏览器
    hot: true, // 开启HMR功能
    stats: "errors-warnings", // 只输出错误和警告信息
  },
};