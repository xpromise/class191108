# gulp

- 基于 Nodejs 流的构建工具

## 下载安装

- 全局安装 gulp
  - npm i gulp-cli -g
- 本地安装 gulp
  - npm init -y 初始化包描述文件
  - npm i gulp -D

## 使用

- 定义 gulp 的配置文件：gulpfile.js

  - 当你 gulp 指令时会读取配置文件的配置，从而执行任务

- gulp API

  - src() 相当于可读流，读取文件
  - dest() 相当于可写流，写入文件
  - task() 注册任务
  - series() 同步执行任务
  - parallel() 并行执行任务
  - watch() 监视文件，执行后续文件

- 找 gulp 插件
  - https://gulpjs.com/plugins/ 更新可能会不及时
  - https://www.npmjs.com/ 最全
