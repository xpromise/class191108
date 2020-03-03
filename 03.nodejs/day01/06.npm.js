/*
  npm 包管理器
    如何下载包？ 注意：下载之前先要初始化一个package.json

    版本号：
      1.12.4  --> 必须是 1.12.4 版本
      ^1.12.4 --> 必须是 1.12.x 版本，x取最新的
      ~1.12.4 --> 必须是 1.x.x 版本，x取最新的

    1. npm install xxx  ===  npm i xxx -S === npm i xxx --save
      默认下载的是最新版本的包
      创建一个node_modules目录，把下载的包安装进去
      创建一个package-lock.json文件，npm下载缓存文件（1. 能让第二次下载速度更快 2. 记录版本号和依赖关系）
      将下载的包添加到package.json中的生产依赖里

    2. npm i xxx@1.12.1 
      下载指定版本的包
      npm i xxx@1.12 
      下载1.12.x版本的包，x代表最新版本
    
    3. npm i xxx -D === npm i xxx --save-dev
      下载包并添加到package.json中的开发依赖里

    4. npm i xxx -g 
      全局安装一个包
        作用：将来作为cmd/终端指令使用，不是通过模块化语法引入使用
        比如：npm i webpack -g --> 将来就可以在 cmd/终端 使用webpack指令
      
      如果本地安装也可以作为指令使用：npx xxx
        npx babel --> 会将babel临时添加为环境变量，从而可以作为指令使用

    5. npm i 
      下载当前package.json中所有依赖（开发、生产）包    
    
    6. npm remove xxx
      删除包和依赖  

*/


const $ = require('jquery');

console.log($);
