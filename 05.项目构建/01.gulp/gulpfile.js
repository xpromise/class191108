/*
  gulp的配置文件
    1. 搭建开发环境：让代码在浏览器运行即可
      - js代码(ES6模块化)
        gulp-babel 将ES6模块化编译成commonjs模块化
        gulp-browserify 将commonjs模块化编译成浏览器能识别的模块化
      - less代码
        gulp-less 将less编译成css
    2. 搭建生产环境
*/
/*
  在所有构建工具，都是基于nodejs平台去构建的。（因为要使用fs模块进行文件读写）
  所以模块化使用commonjs
*/
const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require("gulp-browserify");
const rename = require("gulp-rename");
const less = require("gulp-less");
const connect = require("gulp-connect");
const open = require("./open");

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
    .pipe(gulp.dest("dist/js")) // 将可读流中文件输出到"dist/js"目录下
    .pipe(connect.reload());
});

gulp.task("browserify", function() {
  // 必须加return 否则报错
  return gulp
    .src("dist/js/index.js")
    .pipe(browserify()) // 将Commonjs模块化编译成浏览器能识别的模块化
    .pipe(rename("dist.js")) // 对流中的文件进行重命名
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

gulp.task("less", function() {
  return gulp
    .src("src/less/*.less")
    .pipe(less()) // 将less编译成css
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

gulp.task("html", function() {
  return gulp
    .src("src/index.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

// 配置自动化任务
gulp.task("watch", () => {
  // 开启服务器
  connect.server({
    root: "dist", // 根目录
    port: 3000,
    livereload: true // 自动刷新浏览器
  });

  // 自动打开浏览器
  open("http://localhost:3000");

  // 监视文件
  // 自动编译
  // 监视 './src/js/*.js' 文件，一旦文件发生变化，会执行后续任务
  gulp.watch("./src/js/*.js", gulp.series("js"));
  gulp.watch("./src/less/*.less", gulp.series("less"));
  gulp.watch("./src/index.html", gulp.series("html"));
});

// 运行任务：gulp 任务名称

// 配置统一任务
// 当你执行js任务时，实际上执行的是  gulp.series 任务，
// 而 gulp.series 任务实际上执行的是 'babel', 'browserify'
// 特点是：同步执行  一般会慢一点
gulp.task("js", gulp.series(["babel", "browserify"]));
// 特点是：异步/并行执行 一般会快一点
// gulp.task('js', gulp.parallel(['babel', 'browserify']));
gulp.task("dev", gulp.parallel(["js", "less", "html"]));
gulp.task("start", gulp.series(["dev", "watch"]));
