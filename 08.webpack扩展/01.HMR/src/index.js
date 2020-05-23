// 引入样式文件，webpack打包index.js时才会将index.css一起打包
import "./index.css";
// 普通引入：没有HMR功能
import add from "./add";

// 判断当前有没有启动HMR功能
if (module.hot) {
  // add.js开启HMR功能
  module.hot.accept("./add", () => {
    // 一旦add.js文件发生变化，就会重新加载这个文件，其他文件就不会变化
    // 最后执行当前函数
    console.log("当前函数执行了~");
  });
}


