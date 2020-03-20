/*
  webpack的核心配置文件
*/
const paths = require("./paths");

module.exports = function(webpackEnv) {
  // 定义识别开发/生产环境的变量
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  
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
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      // 所有资源引入路径公共路径
      publicPath: "/",
      /*
        devtool相关
      */
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, "/")
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: "this"
    },
    // loader
    module: { rules: [] },
    // plugins
    plugins: []
  };
};
