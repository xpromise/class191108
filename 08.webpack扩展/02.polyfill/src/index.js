// 一旦引入，就会加载所有语法兼容包
// import '@babel/polyfill';
// 引入样式文件，webpack打包index.js时才会将index.css一起打包
import "./index.css";
import add from "./add";
console.log(add(1, 2));

const promise = new Promise(() => {});
console.log(promise);
