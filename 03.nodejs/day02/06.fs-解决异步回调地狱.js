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

// 封装方法
function open(filename) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    const filepath = path.resolve(__dirname, filename);
    fs.open(filepath, "w", (err, fd) => {
      if (err) {
        // 当异步方法做失败了，将promise对象的状态改为失败状态
        reject(err);
        return;
      }
      // 当异步方法做成功了，将promise对象的状态改为成功状态
      resolve(fd);
    });
  });
}

function write(fd, string) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    fs.write(fd, string, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function close(fd) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    fs.close(fd, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// 定义async函数
(async () => {
  // 执行异步操作
  /*
    async函数返回值一定是promise对象

    await 会等后面的promise对象的状态发生变化（只会等promise对象，别的都不会等）
    一旦状态变成了成功状态，就不等了，会将resolve(value)中value返回
    一旦状态变成了失败状态，直接退出async函数（剩下代码就不会执行了），
      并将async函数返回promise对象的状态改为失败状态
  */
  const fd = await open("a.txt");

  await write(fd, "async函数+promise解决回调地狱");

  await close(fd);
})()
  .then(() => {
    // async函数里面没有promise对象状态是失败状态
    // 所有异步代码都成功
    // 此时async函数返回的promise就是成功的状态
    console.log("所有代码执行成功~");
  })
  .catch(err => {
    // 只要async函数中有一个promise对象变成失败，
    // 就会终止运行，返回一个失败状态的promise
    // err就是失败的原因（里面promise  reject(err)中的err）
    console.log("方法执行失败了", err);
  });
