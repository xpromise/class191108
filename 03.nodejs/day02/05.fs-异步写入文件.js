/*
  fs 文件系统
    1. 写入文件
      同步写入
      异步写入：一般都有回调函数
        打开文件
          fs.open()
        写入内容
          fs.wirte()
        关闭文件
          fs.close()
    2. 读取文件

    3. 扩展
*/

const fs = require("fs");
const path = require("path");

// 打开文件
const filepath = path.resolve(__dirname, "a.txt");

fs.open(filepath, "a", (error, fd) => {
  /*
    error 错误对象
      null 没有错误
      { 错误信息 } 有错误

      在nodejs程序设计中，往往异步回调函数的第一个参数都是error
      这种机制我们叫做 错误优先机制（提倡优先解决错误~）

    fd 打开的文件的文件描述符
  */
  if (error) {
    // 优先处理错误
    console.log(error);
    return;
  }
  // 业务功能逻辑
  // 写入内容
  fs.write(fd, "今天天气不晴朗~", error => {
    // 优先处理错误
    if (error) {
      console.log(error);
    }
    // 不管做成功还是失败，都要关闭文件
    fs.close(fd, error => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("文件关闭");
    });
  });
});

