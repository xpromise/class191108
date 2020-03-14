# axios 源码分析

## 目录结构

- 下载
  - npm i otree-cli -g
- 使用
  - otree
  - otree -f

```md
├─ CHANGELOG.md   版本迭代文档
├─ dist           打包构建资源目录
| ├─ axios.js     axios将所有文件打包输出一个文件
| ├─ axios.min.js 压缩后的axios文件
├─ lib            axios源代码
├─ index.d.ts       typescript类型声明文件
├─ index.js         axios入口文件
├─ LICENSE          开源协议
├─ package.json     包描述文件
├─ README.md        使用说明文档
└─ UPGRADE_GUIDE.md 大版本变化更新记录


├─ adapters     包含发送请求对象适配器
|  ├─ http.js   基于http模块发送请求对象模块（Nodejs）
|  └─ xhr.js    基于ajax发送请求对象模块（Browser）
├─ cancel       包含取消请求的方法
|  ├─ Cancel.js         
|  ├─ CancelToken.js    
|  └─ isCancel.js       
├─ core         axios核心模块
|  ├─ Axios.js
|  ├─ dispatchRequest.js
|  ├─ InterceptorManager.js
|  ├─ mergeConfig.js
├─ helpers      帮助axios分析工具函数
├─ axios.js     入口文件
├─ defaults.js  axios的默认配置文件
└─ utils.js     工具函数
```
