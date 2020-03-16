/*
  gulp的配置文件
    1. 搭建开发环境：让代码在浏览器运行即可
      - js代码(ES6模块化)
        gulp-babel 将ES6模块化编译成commonjs模块化

    2. 搭建生产环境
*/
/*
  在所有构建工具，都是基于nodejs平台去构建的。（因为要使用fs模块进行文件读写）
  所以模块化使用commonjs
*/
const gulp = require("gulp");
const babel = require("gulp-babel");

// 注册任务
// gulp.task(任务名称, 任务回调函数)
gulp.task("babel", () => {
  // 必须加return，否则报错
  return gulp
    .src("src/js/*.js") // 将src/js/index.js文件读取
    .pipe(
      // 对可读流中的文件数据进行babel处理
      babel({ 
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulp.dest("dist/js")); // 将可读流中文件输出到"dist/js"目录下
});

// 运行任务：gulp 任务名称
