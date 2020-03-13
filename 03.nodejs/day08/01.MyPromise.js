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
  MyPromise.reject = function() {};
  MyPromise.all = function() {};

  w.MyPromise = MyPromise;
})(window);
