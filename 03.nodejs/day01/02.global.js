/*
  browser中全局对象是window
  node中全局对象是global
    {
      global: [Circular],
      clearInterval: [Function: clearInterval],
      clearTimeout: [Function: clearTimeout],
      setInterval: [Function: setInterval],
      setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
      queueMicrotask: [Function: queueMicrotask],
      clearImmediate: [Function: clearImmediate],
      setImmediate: [Function: setImmediate] {
        [Symbol(util.promisify.custom)]: [Function]
      }
      process,
      Buffer,
      console
    }

    setTimeout 延时计时器
    setInterval 循环计时器
    setImmediate 立即执行函数

    注意：在cmd/终端中，所有退出指令：ctrl + c （一次不行就多按几次）
*/
// console.log(global);
// console.log(window);

// setTimeout(() => {
//   console.log("setTimeout()");
// }, 1000);

// setInterval(() => {
//   console.log("setInterval()");
// }, 1000);

// setImmediate(() => {
//   console.log("setImmediate()");
// });

// console.log("全局代码全部执行完了~");

// console.log(global.process);
// console.log(global.Buffer);
