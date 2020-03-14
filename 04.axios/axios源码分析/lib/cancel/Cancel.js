'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};
// 这个原型上的属性，就是用来判断错误是否是取消请求错误
Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
