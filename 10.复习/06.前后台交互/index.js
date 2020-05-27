/*
  1. ajax
    手写原生AJAX
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readystate === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // 请求成功 

          } else {
            // 请求失败
          }
        } 
      }
      xhr.open('GET', 'xxx');
      xhr.send();
    
    面试题：
      1. readystate值有哪些情况？
        0 初始化，刚刚创建xhr
        1 调用open方法，还没有调用send
        2 调用send方法，已经接受到部分响应数据（响应首行/头）
        3 接受到了部分响应体数据（如果数据较小，就全部接受）
        4 接收到了全部响应体数据
      2. 常见的status响应状态码？ 
        1xx 未完成，还需要进一步处理
        2xx 200 响应成功
        3xx 重定向
          302 请求重定向
          304 请求走缓存
        4xx 客户端错误
          401 没有权限访问 - token过期/token无效/没有token
          403 禁止访问
          404 资源找不到
        5xx 服务器错误
          500 服务器内部错误

  2. 跨域*****
    原因：
      违背同源策略产生跨域，
      同源策略：协议、域名、端口号必须完全一致
      注意：只有ajax请求才会存在跨域问题，普通的http请求没有跨域问题
    解决方案：
      1. jsonp --> 利用script解决跨域，问题就是只能发送GET请求
      2. cors --> 服务端通过响应头字段来决定是否可以跨域
        Access-Control-Allow-Oirign *
        
        Access-Control-Allow-Methods *
        Access-Control-Allow-Headers *
        Access-Control-Max-Age *
        例子：
        Access-Control-Allow-Credentials: true
        Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD
        Access-Control-Allow-Origin: https://juejin.im
        Access-Control-Max-Age: 86400

        进阶：预检请求 Options
          概念：客户端不知道当前请求是否可以跨域，所以在发送真正请求之前
          提前发送一个请求方式为options的预检请求来判断当前请求是否可以跨域，
          如果预检请求返回结果标识可以跨域，才会发送真正请求，如果不行，就不发送真正请求了，会爆跨域的错误

          怎么开启预检请求？Access-Control-Allow-Credentials: true
          怎么优化预检请求的性能？
            预检请求每次发性能不好，所以可以通过
              Access-Control-Max-Age: 86400来缓存预检请求结果，
              在缓存有效期内不会再重新发送预检请求，默认请求可以跨域
        
      3. 开发中：服务器代理模式(正向代理 proxy)
        React基于脚手架项目 在package.json中配置 proxy: 'http://localhost:5000'
        Vue基于4脚手架项目 在vue.config.js中配置
          devServer: {
            proxy: {
              '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
              },
              '/foo': {
                target: '<other_url>'
              }
            }
          }
        
        原理：
          1. 服务器代理解决跨域原理
            客户端 发送请求 代理服务器  (客户端代码就是由代理服务器运行的，所以符合同源策略没有跨域)
            代理服务器 转发请求 目标服务器 (服务器和服务器之间没有跨域问题)
              所以解决了跨域
          2. 脚手架配置proxy原理  
            实际上最终都是向 webpack中devServer添加proxy配置
            所以proxy配置的问题可以直接看webpack的文档： https://webpack.docschina.org/configuration/dev-server/#devserver-proxy

      4. 上线：服务器代理模式(nginx)

          # 代表以 /api/v1/ 开头请求
          location ^~/api/v1/ {
            # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
            rewrite ^/apis/(.*)$ /$1 break; 
            # 转发到 https://www.atguigu.com/ 上
            proxy_pass https://www.atguigu.com/;
          } 

          location ^~/api/v2/ {
            # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
            rewrite ^/apis/(.*)$ /$1 break;
            proxy_pass https://www.atguigu.com/;
          }   
        
        进阶：https://juejin.im/post/5ea931866fb9a043815146fb
          部署项目时：
          优化配置 
            1. 压缩gzip
            2. 缓存
            3. 负载均衡 
            ...
  3. axios
    1. axios的拦截器配置
      初始化配置
          axios.create({
            // 配置开发环境和生产环境请求地址
            baseUrl: process.env.NODE_ENV === 'developemnt' ? '/api' : 'http://www.atguigu.com'
          })

      请求拦截器
          具体情况看接口文档：
          config.headers.token = token
          config.headers.token = Bearer token
          config.headers['X-YY-ZZZ'] = token
          
          进阶：
            config.cancelToken = function (cancel) {
              cancelTokenMap
            }
            核心思想：
              当浏览器历史记录发生变化，要把上一个记录的请求取消掉
              history.listen
              遍历存储token容器判断遍历pathname和当前pathname是否一致，不一致就调用cancel

      响应拦截器
        响应成功回调函数
            判断请求是否成功 response.data.code 1 / 20001 / 10001 / -100
              成功返回 response.data.data
              失败进行错误提示
        响应失败回调函数
            判断具体失败的原因
              err.response
                有值：有响应结果
                  根据err.response.status响应状态码来判断具体的错误原因
                  401 --> 清除token，让用户重新登录
                没有值：没有响应结果（服务器报错/网络超时）
                
        进度条提示功能

    2. axios原理
      
      axios 和 axios.create() 区别：
          axios有取消请求的方法
          axios.create()本身是没有的
      
      axios发送请求经历了什么？
        - axios(url[, config])
        - axios(config)
        - axios.get/post(url, data, config)
        不管通过axios如何发送请求，实际上调用都是Axios.prototype.request

          1. Axios.prototype.request
            - 将传入的配置和默认配置合并
            - 初始化请求方式
            - 定义chain数组：请求拦截器 发送请求 响应拦截器
            - 遍历数组执行里面函数
              - 先触发请求拦截器
                - 修改请求配置（如：添加token）
              - 再发送请求
                - 调用 dispatchRequest 来发送请求
              - 最后触发响应拦截器
            - 最后将响应拦截器的返回值返回出去   
              - 外面axios调用返回值就能拿到响应拦截器的返回值

          2. 调用 dispatchRequest

          - 发送请求时转换请求体
          - 合并请求头
          - 调用adaptor发送请求
          - 转换响应体数据
            - 成功返回成功的数据
            - 失败返回失败的原因

          3. 调用 adaptor

          - 判断平台：如果 Nodejs 就用 Http，如果 Browser 就使用 xhr
          - 整合请求地址、请求方式、请求头、请求参数，发送请求
          - 通过  status >= 200 && status < 300 来判断响应成功/失败


*/
