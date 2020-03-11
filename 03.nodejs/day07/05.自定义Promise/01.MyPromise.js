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

    // 要求Promise对象的状态只能修改一次 并且 只能pending --> resolved/rejected
    function resolve(value) {
      if (_self._status === "pending") {
        // 将Promise对象状态改成成功状态
        _self._status = "resolved";
        // 给Promise对象结果值
        _self._result = value;
      }
    }

    function reject(reason) {
      if (_self._status === "pending") {
        // 将Promise对象状态改成失败状态
        _self._status = "rejected";
        // 给Promise对象结果值
        _self._result = reason;
      }
    }

    // 同步执行exector
    exector(resolve, reject);
  }

  MyPromise.prototype.then = function() {};
  MyPromise.prototype.catch = function() {};

  MyPromise.resolve = function() {};
  MyPromise.reject = function() {};
  MyPromise.all = function() {};

  w.MyPromise = MyPromise;
})(window);
