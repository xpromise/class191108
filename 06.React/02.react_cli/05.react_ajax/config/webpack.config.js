/*
  webpack的核心配置文件

  npm i -D webpack webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react less less-loader style-loader css-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin url-loader file-loader html-webpack-plugin
  npm i react react-dom
*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = function(webpackEnv) {
  // 定义识别开发/生产环境的变量
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  // 处理样式loader
  const getStyleLoader = function(hasExtractLoader) {
    // css 和 less公共部分
    const loaders = [
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader // 生产环境，提取CSS成单独文件
      },
      isEnvDevelopment && {
        loader: "style-loader" // 开发环境，创建style标签插入到页面中
      },
      {
        loader: "css-loader"
      }
    ].filter(Boolean);

    if (hasExtractLoader) {
      loaders.push({
        loader: hasExtractLoader
      });
    }

    return loaders;
  };

  // 对象中写webpack核心配置
  return {
    // 模式
    mode: isEnvDevelopment ? "development" : isEnvProduction && "production",
    // 入口
    entry: paths.appIndexJs,
    // 输出
    output: {
      /*
        生产环境是 build  因为生产环境有输出
        开发环境是 undefined  开发环境是在内存编译打包，没有输出
      */
      path: isEnvProduction ? paths.appBuild : undefined,
      /*
        生产环境：输出js文件将来可能有多个
        开发环境：只有一个
      */
      filename: isEnvProduction
        ? "static/js/[name].[hash:10].js"
        : isEnvDevelopment && "static/js/bundle.js",

      // pathinfo: isEnvDevelopment,
      // 提前使用webpack5部分功能
      futureEmitAssets: true,
      /*
        chunk 
          来自于一个入口文件就是一个chunk
          来自于多个入口文件就是多个chunk
          chunkFilename负责给chunk取名字
      */
      // chunkFilename: isEnvProduction
      //   ? "static/js/[name].[contenthash:8].chunk.js"
      //   : isEnvDevelopment && "static/js/[name].chunk.js",
      // 所有资源引入路径公共路径
      publicPath: "/"
      /*
        devtool相关
      */
      // devtoolModuleFilenameTemplate: isEnvProduction
      //   ? info =>
      //       path
      //         .relative(paths.appSrc, info.absoluteResourcePath)
      //         .replace(/\\/g, "/")
      //   : isEnvDevelopment &&
      //     (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      // jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      // globalObject: "this"
    },
    // loader
    module: {
      rules: [
        {
          // npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
          // babel-loader 用来将jsx语法编译成js语法
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/, // 排除
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                // 指示babel做啥事
                "@babel/preset-env", // 只能处理普通的js语法，不能处理jsx
                "@babel/preset-react" // 专门用来处理react jsx语法
              ],
              plugins: [
                // 解决识别class语法（static）
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        },
        {
          // npm i less less-loader style-loader css-loader -D
          test: /\.less$/,
          use: getStyleLoader("less-loader")
        },
        {
          // 专门用来处理css文件
          test: /\.css$/,
          use: getStyleLoader()
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                name: "static/media/[name].[hash:10].[ext]"
              }
            }
          ]
        },
        // 之前加上 html-loader 处理html中的图片
        // 但是，现在开发的react项目，项目中index.html中不会写任何东西（div#root）
        // 所以，不需要引入 html-loader 来处理html中的图片
        {
          exclude: /\.(html|css|less|png|jpe?g|gif|webp|js|jsx)/,
          loader: "file-loader", // 处理其他资源~
          options: {
            name: "static/media/[name].[hash:10].[ext]"
          }
        }
      ]
    },
    // plugins
    plugins: [
      // 只有生产环境使用
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // 提取css成单独文件
          filename: "static/css/[name].[hash:10].css"
        }),
      isEnvProduction && new OptimizeCSSAssetsPlugin(), // 压缩css
      new HtmlWebpackPlugin(
        Object.assign(
          // 浅拷贝
          {},
          {
            template: paths.appHtml
          },
          isEnvProduction
            ? {
                // https://github.com/kangax/html-minifier#options-quick-reference
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : {}
        )
      )
    ].filter(Boolean), // 过滤false的值
    resolve: {
      extensions: [".js", ".jsx", ".json"] // 引入文件扩展名可以省略不写
    }
  };
};
