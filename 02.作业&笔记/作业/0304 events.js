class Events {
  constructor() {
    /*
      定义存储多个事件容器
        { 
          eventName1: [callback1, callback2],
          eventName2: [callback1, callback2],
        }
    */
    this._events = {};
  }

  /**
   * 绑定持久性事件
   * @param {string} eventName
   * @param {function} callback
   */
  on(eventName, callback) {
    // 绑定事件实际上是将事件名和回调函数添加到容器中
    // 判断之前有没有绑定过事件
    if (this._events[eventName]) {
      // 说明之前绑定过事件
      this._events[eventName].push(callback);
      return;
    }

    // 说明之前没有绑定过事件，值是undefined
    this._events[eventName] = [callback];
  }

  /**
   * 绑定一次性事件
   * @param {string} eventName
   * @param {function} callback
   */
  once(eventName, callback) {
    // 一次性事件: 触发事件后要自动解绑事件
    const cb = () => {
      // 调用/触发函数
      callback();
      // 解绑事件
      this.off(eventName, cb);
    };

    this.on(eventName, cb);
  }

  /**
   * 解绑事件
   * @param {string} eventName
   * @param {function} callback
   */
  off(eventName, callback) {
    const callbacks = this._events[eventName];
    if (callbacks) {
      // 存在才需要解绑事件
      // 返回值true保留，返回false过滤
      this._events[eventName] = callbacks.filter(item => item !== callback);
    }
  }

  /**
   * 触发事件
   * @param {string} eventName
   * @param  {...any} args
   */
  emit(eventName, ...args) {
    // 找到事件，并将其所有的回调函数调用(异步调用回调函数)
    const callbacks = this._events[eventName];

    if (callbacks) {
      // 如果存在，才需要触发回调函数
      setTimeout(() => {
        this._events[eventName].forEach(callback => {
          // 同步调用
          // callback(...args);
          callback(...args);
        });
      }, 0);
    }
  }
}

class MyEmmiter extends Events {}

const myEmmiter = new MyEmmiter();

/* const callback = (...args) => {
  console.log("事件aaa触发了 111", ...args);
};
myEmmiter.on("aaa", callback);

myEmmiter.on("aaa", (...args) => {
  console.log("事件aaa触发了 222", ...args);
});
 */
myEmmiter.once("bbb", (...args) => {
  console.log("事件bbb触发了 111", ...args);
});

/* myEmmiter.emit("aaa", 3, 2, 1);

myEmmiter.off("aaa", callback);

myEmmiter.emit("aaa", 3, 2, 1); */

myEmmiter.emit("bbb", 1, 2, 3);
myEmmiter.emit("bbb", 1, 2, 3);

console.log("全局同步全部执行完了~");
