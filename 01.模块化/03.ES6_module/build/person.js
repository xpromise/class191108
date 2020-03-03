"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setName = setName;
exports.age = exports.name = void 0;
// 分别暴露 --> 后面接完整表达式
var name = 'jack';
exports.name = name;
var age = 18;
exports.age = age;

function setName() {}

;