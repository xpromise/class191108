/*
  自定义Promise
*/
(function(w) {
  function MyPromise(exector) {
    const _self = this;
    _self._status = "pending";
    _self._result = undefined;

    _self._callbacks = {};

    function resolve(value) {
      if (_self._status === "pending") {
        _self._status = "resolved";
        _self._result = value;
        setTimeout(function() {
          const onResolved = _self._callbacks.onResolved;
          onResolved && onResolved(value);
        }, 0);
      }
    }

    function reject(reason) {
      if (_self._status === "pending") {
        _self._status = "rejected";
        _self._result = reason;
        setTimeout(function() {
          const onRejected = _self._callbacks.onRejected;
          onRejected && onRejected(reason);
        }, 0);
      }
    }

    exector(resolve, reject);
  }

  MyPromise.prototype.then = function(onResolved, onRejected) {
    const _self = this;
    /*
      允许then方法两个参数都不是函数，不是函数要变成函数
        如果不是函数，
          之前promise对象是成功，then方法返回也得是成功
          之前promise对象是失败，then方法返回也得是失败
    */
    onResolved = typeof onResolved === "function" ? onResolved : value => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : reason => {
            throw reason;
          };

    return new MyPromise(function(resolve, reject) {
      _self._callbacks.onResolved = function(value) {
        try {
          const result = onResolved(value);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };

      _self._callbacks.onRejected = function(reason) {
        try {
          const result = onRejected(reason);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };
    });
  };

  MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
  /*  
    不管成功/失败都要触发
  */
  MyPromise.prototype.finally = function(callback) {
    return this.then(callback, callback);
  };

  // 返回值是一个promise，状态默认是成功的，也有可能是初始化/失败
  MyPromise.resolve = function(value) {
    return new MyPromise(function(resolve, reject) {
      if (value instanceof MyPromise) {
        // 说明传入参数是一个Promise， 你状态是啥，我状态也是啥
        value.then(resolve, reject);
      } else {
        // 说明传入参数不是一个Promise, 默认是成功的
        resolve(value);
      }
    });
  };

  // 一定返回一个失败状态promise
  MyPromise.reject = function(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };

  /*
    只有所有成功返回值promise才成功
    只要有一个失败返回值promise就失败
  */
  MyPromise.all = function(promises) {
    return new MyPromise((resolve, reject) => {
      const promisesLength = promises.length;
      // 收集所有成功promise的结果值
      const result = new Array(promisesLength);
      // 成功promise的数量
      let resolvedCount = 0;

      // 遍历数组
      promises.forEach((promise, index) => {
        // 判断是否是promise
        // 判断promise对象状态
        MyPromise.resolve(promise).then(
          value => {
            // 将结果值收集
            // result.push(value); // 这样做结果值顺序是乱序
            // 按照顺序添加结果值
            result[index] = value;
            resolvedCount++;
            if (resolvedCount === promisesLength) {
              // 说明所有都成功了
              resolve(result);
            }
          },
          reason => {
            // 失败
            reject(reason);
          }
        );
      });
    });
  };

  /*
    返回值promise状态 看传入promise对象中的第一个发生状态变化的状态
  */
  MyPromise.race = function(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        // promise可能是number（不是一个promise对象）
        // 将其包装成promise对象
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  };

  /*
    等所有传入promise对象状态都发生变化
    最终返回值一定是成功的状态promise，并里面包含所有传入promise的结果值（一一对应）
  */
  MyPromise.allSettled = function(promises) {
    return new MyPromise(resolve => {
      const promisesLength = promises.length;
      // 收集所有成功promise的结果值
      const result = new Array(promisesLength);
      // 成功promise的数量
      let resolvedCount = 0;

      // 遍历数组
      promises.forEach((promise, index) => {
        // 判断是否是promise
        // 判断promise对象状态
        MyPromise.resolve(promise).then(
          value => {
            // 收集结果值
            result[index] = {
              status: "resolved",
              value: value
            };
            resolvedCount++;
            if (resolvedCount === promisesLength) {
              // 说明所有都成功了
              resolve(result);
            }
          },
          reason => {
            // 收集结果值
            result[index] = {
              status: "rejected",
              reason: reason
            };
            resolvedCount++;
            if (resolvedCount === promisesLength) {
              // 说明所有都成功了
              resolve(result);
            }
          }
        );
        /*
          then 成功
          catch 失败
          finally 成功/失败
        */
      });
    });
  };

  w.MyPromise = MyPromise;
})(window);
