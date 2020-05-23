const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
  1. 下载
    npm init -y 先初始化package.json 否则后面下载包会删除之前的~
    npm i webpack webpack-cli html-webpack-plugin style-loader css-loader postcss-loader postcss-import postcss-preset-env cssnano -D
  2. 配置指令
    "start": "webpack"
  3. 配置
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: (loader) => [
          require("postcss-import")({ root: loader.resourcePath }),
          require("postcss-preset-env")(),
          require("cssnano")(),
        ],
      },
    },
    默认情况下就能做一些css兼容性处理了，但是不够全
    所以，还需要再package.json中配置
      文档：https://github.com/browserslist/browserslist
      "browserslist": {
        "development": [ 
          "last 1 Chrome versions"
        ],
        "production": [
          "cover 99.5%",
          "not dead",
          "not op_mini all"
        ]
      }
    
    设置 process.env.NODE_ENV = "development" / "production";
 */

// process.env.NODE_ENV = "development";
process.env.NODE_ENV = "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "./js/built.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [
          "style-loader",
          "css-loader",
          // https://webpack.docschina.org/loaders/postcss-loader#plugins
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")(),
              ],
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
};
