
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*  
  1. 下载包
    npm i webpack webpack-dev-server webpack-cli -D
    npm i html-webpack-plugin style-loader css-loader -D

  2. 在package.json中配置启动webpack的指令
    "start": "webpack-dev-server"  

  3. devServer
    可以热更新的。
    问题：
      默认情况，改动一个文件，会全部刷新，会全部重新打包性能不好
    需求：  
      改动一个文件，只更新这一个文件，其他文件不变（性能更好）
    解决：HMR（hot module replacement 热模块替换）
      只更新要更新的模块，其他模块不变  
      新的问题：
        默认情况下，样式文件有HMR功能（style-loader内部处理了）
        但是，JS文件没有HMR功能
      解决：怎么让JS文件有HMR功能？  
        if (module.hot) {
          module.hot.accept("./add", () => {
            console.log("当前函数执行了~");
          });
        }
  4. 总结
    HMR功能能够让我们在开发环境下重新编译打包速度更快   
*/

module.exports = {
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: './js/built.js'
  },
  module: {
    rules: [
      {
        // 处理样式文件
        test: /\.css$/,
        // 只检测src目录下的文件
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader'
        ]
      }0
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // 添加支持HMR功能的插件
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true, // 自动打开浏览器
    host: 'localhost',
    port: 9527,
    compress: true, // 启动gzip压缩资源
    hot: true, // 启动HMR功能
  }
}