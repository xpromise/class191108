/*
  自定义Promise
*/
(function(w) {
  /*
    const promise = new MyPromise((resolve, reject) => {
      console.log(111);
      resolve(111); // 1. 将Promise对象状态改成成功状态 2. 给Promise对象结果值
    })
  */
  function MyPromise(exector) {
    // 代表实例对象promise
    const _self = this;
    // 初始化实例对象的状态为 pending
    _self._status = "pending";
    // 初始化实例对象的结果值
    _self._result = undefined;

    _self._callbacks = {};

    // 要求Promise对象的状态只能修改一次 并且 只能pending --> resolved/rejected
    function resolve(value) {
      if (_self._status === "pending") {
        // 将Promise对象状态改成成功状态
        _self._status = "resolved";
        // 给Promise对象结果值
        _self._result = value;
        // 调用成功的回调
        // 同步调用
        // _self._callbacks.onResolved();
        // 异步调用
        setTimeout(function() {
          _self._callbacks.onResolved(value);
        }, 0);
      }
    }

    function reject(reason) {
      if (_self._status === "pending") {
        // 将Promise对象状态改成失败状态
        _self._status = "rejected";
        // 给Promise对象结果值
        _self._result = reason;
        // 异步调用
        setTimeout(function() {
          _self._callbacks.onRejected(reason);
        }, 0);
      }
    }

    // 同步执行exector
    exector(resolve, reject);
  }

  MyPromise.prototype.then = function(onResolved, onRejected) {
    const _self = this;
    
    // 返回一个新Promise对象
    return new MyPromise(function (resolve, reject) {
      // 新Promise对象的状态看什么  onResolved 或 onResolved 的执行结果
      _self._callbacks.onResolved = function (value) {
        // 得到内部函数的结果值
        const result = onResolved(value);
        // 判断result是否是Promise对象
        if (result instanceof MyPromise) {
          // 是promise
          // 怎么知道result内部的状态？
          result.then(function(value) {
            resolve(value);
          }, function (reason) {
            reject(reason);
          })
        } else {
          // 不是promise
        }
      };
      _self._callbacks.onRejected = onRejected;
    })
  };

  MyPromise.prototype.catch = function() {};

  MyPromise.resolve = function() {};
  MyPromise.reject = function() {};
  MyPromise.all = function() {};

  w.MyPromise = MyPromise;
})(window);
