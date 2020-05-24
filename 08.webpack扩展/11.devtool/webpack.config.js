const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
  1. 下载包
    npm i babel-loader @babel/preset-react @babel/core webpack-dev-server -D
    npm i react react-dom 

  2. 问题
    webpack会将所有代码打包成一个文件，一旦文件出错，提示的是打包后文件的错误，
    我们没法通过打包后代码观察源代码到底有什么问题（不好调试错误）
  
  3. 解决 source-map
    source-map 是一个技术，最终会有一个文件 xxx.map
    提供一个源代码与webpack构建后代码的一一映射关系
    当构建后代码出现问题，就可以根据source-map文件，追踪到源代码出现的问题，
    从而提示源代码的错误，这样就能方便开发者调试错误
  
  4. 使用
    devtool: 'source-map'  

    开发环境: 为了让首次构建和重新构建速度更快
      cheap-module-eval-source-map
    生产环境: 为了让调试更友好，打包体积更小
      source-map
*/

module.exports = {
  // entry: "./src/index.js",  // 等价于下面这种
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: undefined,
    filename: "./js/[name].js",
  },
  module: {
    rules: [
      {
        // oneOf数组中的loader一旦匹配上，后面的就不看了
        oneOf: [
          {
            test: /\.css$/,
            include: path.resolve(__dirname, "src"),
            use: ["style-loader", "css-loader"],
            sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
          },
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, "src"),
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
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
  ],
  mode: "development",
  devServer: {
    open: true,
    port: 9527,
    hot: true,
  },
  resolve: {
    // 自动补全文件扩展名（后缀名）
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'cheap-module-eval-source-map' 
  /*
    开发环境: 为了让首次构建和重新构建速度更快
      cheap-module-eval-source-map
    生产环境: 为了让调试更友好，打包体积更小
      source-map
  */
};
