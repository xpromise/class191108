'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 初始化实例对象默认配置
  this.defaults = instanceConfig;
  // 初始化拦截器方法
  this.interceptors = {
    // 请求拦截器
    request: new InterceptorManager(),
    // 响应拦截器
    response: new InterceptorManager()
  };
}

/**
 * 发送请求的函数
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  if (typeof config === 'string') {
    // axios(url[, config])
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    // axios(config)
    config = config || {};
  }
  // 合并配置（将默认配置和传入配置合并，生成一个新配置）
  config = mergeConfig(this.defaults, config);

  // 设置 config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    // 默认为 get 请求
    config.method = 'get';
  }

  // 发送请求
  // 请求拦截器2 --> 请求拦截器1 --> 发送请求 --> 响应拦截器1 --> 响应拦截器2 --> 请求函数
  var chain = [dispatchRequest, undefined];
  // 创建了一个一定成功状态的promise
  var promise = Promise.resolve(config);
  /*
    axios.interceptors.request.use(fulfilled1, rejected1)
    axios.interceptors.request.use(fulfilled2, rejected2)

    --> this.handlers = [ { 111 }, { 222 } ]

    chain = [ fulfilled2, rejected2, fulfilled1, rejected1, dispatchRequest, undefined ]
  */
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    // 往 chain 前面插入请求拦截器成功和失败回调
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  /*
    axios.interceptors.response.use(fulfilled1, rejected1)
    axios.interceptors.response.use(fulfilled2, rejected2)

    --> this.handlers = [ { 111 }, { 222 } ]

    chain = [ 
      fulfilled2, rejected2,  // 请求拦截器 unshift 添加到前面
      fulfilled1, rejected1, 
      dispatchRequest, undefined, // 发送请求函数
      fulfilled1, rejected1, // 响应拦截器 push 添加后面
      fulfilled2, rejected2
    ]
  */
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  /*
    chain = [ 
      fulfilled2, rejected2,  // 请求拦截器 unshift 添加到前面
      fulfilled1, rejected1, 
      dispatchRequest, undefined, // 发送请求函数
      fulfilled1, rejected1, // 响应拦截器 push 添加后面
      fulfilled2, rejected2
    ]

    promise // 因为promise内部的值是config，所有请求拦截器能接受config参数
      .then(fulfilled2, rejected2)
      .then(fulfilled1, rejected1)
      // 因为 dispatchRequest 需要config作为发送请求的配置对象
      // 所以请求拦截器函数必须返回一个config
      .then(dispatchRequest, undefined)
      // dispatchRequest 请求成功返回值是response
      // 所以响应拦截器接受到response作为参数
      .then(fulfilled1, rejected1)
      .then(fulfilled2, rejected2)
      // 响应拦截器的返回值，能决定外部then/catch的值
  */
  while (chain.length) {
    // 第一次遍历时，promise为成功状态
    // chain.shift() 移除数组中第一项元素并作为返回值返回
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 返回一个完整的url(请求地址、请求参数。。。)
Axios.prototype.getUri = function getUri(config) {
  // 合并配置
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// forEach(obj, fn) 既能遍历数组也能遍历对象
// 给Axios.prototype添加请求方法 get/post/put/delete...
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
