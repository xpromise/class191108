'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
// axios的默认配置文件
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  /*
    创建Axios实例对象：context
    context属性：defaults 、interceptors
    context原型上方法：request getUri get post put delete...
  */
  var context = new Axios(defaultConfig);
  // 将 Axios.prototype.request 方法的 this 指向 context
  // instance 是一个 request 函数，this 指向为 context
  // instance 就是我们使用的 axios
  var instance = bind(Axios.prototype.request, context);

  // 将 Axios.prototype 所有方法克隆到 instance 上
  // 为了得到： request getUri get post put delete...
  utils.extend(instance, Axios.prototype, context);

  // 将 context 上面所有属性克隆到 instance 上
  // 为了得到：defaults 、interceptors
  utils.extend(instance, context);

  return instance;
}

/*
  instance === axios 本质上就是request函数，继承Axios构造函数的属性和方法
  Axios   构造函数
  context Axios构造函数的实例对象
*/
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
