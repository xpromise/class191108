/*
  ES6 客户端 Vue / React
    import xxx from 'xxx'
    import { BrowserRouter as Router } from 'xxx' 引入BrowserRouter重命名为Router
    import * as xxx from 'xxx' 将所有引入重命名为xxx

    export xxx
    export default xxx

    import 引入
    export 暴露
  CommonJS 服务端Nodejs / Webpack
    require 引入
      自定义模块，模块路径必须以 ./ ../开头
      Nodejs核心模块/npm下载的模块（第三方模块） 直接写模块路径
    exports / module.exports 暴露
      nodejs模块暴露的本质是 module.exports 的值
      exports是module.exports一个引用
    
    进阶：ES6模块化和CommonJS模块化的区别：
      commonjs是同步加载，有缓存，ES6是运行(编译)时加载，没有缓存
        const { Button } = require('antd'); 
          --> 一旦引入，就会将模块所有内容全部加载到内存中，缓存起来，在执行后面代码

        import { Button } from 'antd'; 
          --> 创建一个只读引用（此时antd模块内容没有加载）
              当你后面使用Button做操作时，才会加载模块antd中Button内容，其他内容不加载
              --> 为什么tree shaking要使用ES6模块化？
*/