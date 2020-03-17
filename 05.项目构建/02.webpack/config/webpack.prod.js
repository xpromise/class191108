/*
  webpack配置文件
*/
const { resolve } = require("path");
// 插件需要引入使用，而loader不需要引入
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // entry
  entry: "./src/js/index.js",
  // output
  output: {
    path: resolve(__dirname, "../build"), // 输出目录
    filename: "[name].js" // 输出文件名
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
            // loader: "style-loader" // 从js文件中找到css字符串，并创建style标签插入页面中
            loader: MiniCssExtractPlugin.loader // 从js文件中找到css字符串，提取css成单独css文件
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
          esModule: false
        }
      },
      {
        test: /\.(html)$/,
        loader: "html-loader"
      },
      {
        // 排除文件
        exclude: /\.(less|jpg|png|gif|js|html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]"
        }
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      // 以 './src/index.html' 为模板创建新的html文件
      // 新html文件结构和原来一样 并且 会自动引入webpack打包生成的js/css资源
      template: "./src/index.html",
      // 压缩选项
      minify: {
        collapseWhitespace: true, // 去除换行符/空格
        removeComments: true, // 去除注释
        removeRedundantAttributes: true, // 去除默认值标签属性
        removeScriptTypeAttributes: true, // 删除script type
        removeStyleLinkTypeAttributes: true, // 删除link type
        useShortDoctype: true // 使用短的doctype（html5）
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
      // chunkFilename: "[id].css"
    }),
    // 压缩css的插件
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      }
      // canPrint: true
    }),
    // 自动删除output.path输出目录的文件
    new CleanWebpackPlugin()
  ],
  // mode
  mode: "production" // 生产环境，会自动压缩js
};
