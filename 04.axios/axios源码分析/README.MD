# axios 源码分析

## 目录结构

- 下载
  - npm i otree-cli -g
- 使用
  - otree
  - otree -f

```md
├─ CHANGELOG.md 版本迭代文档
├─ dist 打包构建资源目录
| ├─ axios.js axios 将所有文件打包输出一个文件
| ├─ axios.min.js 压缩后的 axios 文件
├─ lib axios 源代码
├─ index.d.ts typescript 类型声明文件
├─ index.js axios 入口文件
├─ LICENSE 开源协议
├─ package.json 包描述文件
├─ README.md 使用说明文档
└─ UPGRADE_GUIDE.md 大版本变化更新记录

├─ adapters 包含发送请求对象适配器
| ├─ http.js 基于 http 模块发送请求对象模块（Nodejs）
| └─ xhr.js 基于 ajax 发送请求对象模块（Browser）
├─ cancel 包含取消请求的方法
| ├─ Cancel.js  
| ├─ CancelToken.js  
| └─ isCancel.js  
├─ core axios 核心模块
| ├─ Axios.js
| ├─ dispatchRequest.js
| ├─ InterceptorManager.js
| ├─ mergeConfig.js
├─ helpers 帮助 axios 分析工具函数
├─ axios.js 入口文件
├─ defaults.js axios 的默认配置文件
└─ utils.js 工具函数
```

## 发送请求流程

1. Axios.prototype.request

- axios(url[, config])
- axios(config)
- axios.get/post(url, data, config)
- 实际上都是调用 Axios.prototype.request 方法发送请求
- 合并默认配置、初始化请求方式

2. 调用 dispatchRequest

- 转换请求体/响应体数据
- 合并请求头

3. 调用 adaptor

- 判断平台：如果 Nodejs 就用 Http，如果 Browser 就使用 xhr
- 整合请求地址、请求方式、请求头、请求参数，发送请求
- 只有状态码 2xx 才是成功，其他就是失败
