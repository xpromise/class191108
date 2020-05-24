const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取CSS成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
  默认情况下，一个模块要被所有loader都过一遍，这样性能稍差
  实际上我们只需要其中某个loader处理，其他loader就不用看了~
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
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        enforce: "pre", // 优先执行
        loader: "eslint-loader",
        options: {
          cache: true, // 开启eslint缓存
        },
      },
      {
        // oneOf数组中的loader一旦匹配上，后面的就不看了
        oneOf: [
          {
            test: /\.css$/,
            include: path.resolve(__dirname, "src"),
            use: [MiniCssExtractPlugin.loader, "css-loader"],
            sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true, // 开启babel缓存
            },
          },
        ],
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
