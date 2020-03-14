'use strict';
// 相当于函数的bind方法，用来改变this指向的
// 目的：将传入fn函数的this指向thisArg
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
