/*
  异步代码：
  setTimeout 延时定时器
  setImmediate 立即执行函数
  process.nextTick 立即执行函数

  nodejs事件轮询机制：执行异步代码机制
    timers  定时器：执行到点的定时器回调函数（setTimeout/setInterval）   
    pending callbacks  待定回调：执行延迟到下一个循环迭代的 I/O 回调。
    idle, prepare  准备：仅系统内部使用。
    poll  轮询：执行I/O操作回调 （文件读/写，数据库读/写）
      依次取出，同步执行回调函数。直到全部执行完了（回调队列为空）。
      除非满足下面两个条件之一，否则一直停留在当前阶段，不会下一个阶段。
        1. 定时器到点了
        2. 之前设置过setImmediate
    check  检测：执行setImmediate回调
    close callbacks 关闭回调：一些关闭的回调函数，close

  宏任务、微任务：
    异步代码有优先级关系。有的优先级高先执行，有的优先级低后执行。
    微任务优先级高: process.nextTick 、 Promise.then/catch 、queueMicrotask
      优先级最高的是process.nextTick
      其他微任务，按代码顺序依次执行
    宏任务优先级低：setTimeout、setImmediate
      看nodejs的事件轮询机制

    js引擎执行异步代码。会优先执行微任务，再执行宏任务
      执行微任务时，添加的微任务放入下一个微任务队列
*/

// 1 4 8 5 2 6 3 9
process.nextTick(() => {console.log(111);});

setTimeout(() => {console.log(222);}, 0);
setImmediate(() => {console.log(333);});

const promise = Promise.resolve();

promise
  .then(() => {
    console.log(444);
    process.nextTick(() => {console.log(555);});
    setTimeout(() => {console.log(666);}, 0);
  })
  .catch(() => {console.log(777);})
  .then(() => {
    console.log(888);
    setImmediate(() => {console.log(999);});
  })
  .catch(() => {console.log(101010);})


// 2 1 4 5 3 6
/* process.nextTick(() => {console.log(111);});

// 属于同步代码
const promise = new Promise(resolve => {
  console.log(222);
  resolve();
});

setTimeout(() => {console.log(333);}, 0);

promise.then(() => {console.log(444);});

queueMicrotask(() => {console.log(555);});

setImmediate(() => {console.log(666);}); */

/* process.nextTick(() => {
  console.log('process.nextTick() 333');
})

setTimeout(() => {
  console.log('setTimeout()  111');
}, 0)

setImmediate(() => {
  console.log('setImmediate() 222');
})

console.log('全局代码执行完了 444'); */
