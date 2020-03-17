/*
  webpack配置文件

    开发环境指令：npx webpack-dev-server --config ./config/webpack.dev.js
*/
const { resolve } = require("path");
// 插件需要引入使用，而loader不需要引入
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry
  entry: "./src/js/index.js",
  // output
  output: {
    path: resolve(__dirname, "../build"), // 输出目录
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
      },
      {
        // 处理图片文件(默认是不能处理html的图片，让html加载图片)
        test: /\.(png|jpg|gif)$/,
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192
        //     }
        //   }
        // ]
        loader: "url-loader",
        options: {
          /*
            11kb以下的图片会被base64处理 
            优点：图片不会发送额外的请求，随着html文件一起被请求下来（减少服务器压力）
            缺点：体积会变的更大
            所以一般针对小图片来做
          */
          limit: 11000,
          // [hash:10] hash值取10位
          // [ext] 原来文件扩展名是啥就是啥
          name: "[hash:10].[ext]",
          // 关闭ES6模块化，使用Commonjs模块化
          // 解决 html 中 img src 为 [object Module]
          esModule: false, 
        }
      },
      {
        test: /\.(html)$/,
        loader: "html-loader"
      },
      {
        // 排除文件
        exclude: /\.(less|jpg|png|gif|js|html)$/,
        loader: 'file-loader',
        options: {
          name: "[hash:10].[ext]",
        }
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      // 以 './src/index.html' 为模板创建新的html文件
      // 新html文件结构和原来一样 并且 会自动引入webpack打包生成的js/css资源
      template: "./src/index.html"
    })
  ],
  // mode
  mode: "development", // 开发环境
  /*
    devServer 用来自动化
      npm i webpack-dev-server -D
    之前启动指令是：webpack （注意：这个启动指令不会加载devServer配置）
    要想启动devServer，必须使用 npx webpack-dev-server
    
    webpack 和 webpack-dev-server的区别：
      1. 只有webpack-dev-server才能启动devServer配置，而webpack不行
      2. webpack-dev-server是在内存中构建，没有输出。 webpack会有输出到build下面 
  */
  devServer: {
    contentBase: resolve(__dirname, '../build'), // 运行（构建后）代码的根目录
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    host: 'localhost',
    open: true, // 自动打开浏览器
    overlay: false, // 不要webpack错误在浏览器全屏提示
    quiet: true, // 不要打包打印信息
    // progress: true, // 进度条提示
  }
};
