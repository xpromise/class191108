'use strict';

module.exports = function isCancel(value) {
  // !!强行将一个值转换成Boolean （负负得正）
  return !!(value && value.__CANCEL__);
};
