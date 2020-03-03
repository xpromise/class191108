"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mul = mul;
exports.count = count;

function mul(x, y) {
  return x * y;
}

function count(x, y) {
  return x - y;
} // 统一暴露 --> 暴露多项内容（后面跟对象）