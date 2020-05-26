/*
  移动端rem适配
    1. 原理：
      匹配不同屏幕大小，会自动重新设置根标签字体大小，
      rem单位是随着根标签字体大小放大而放大，缩小而缩小
      与屏幕的比例保持不变，所以各个屏幕的适配
    
    2. 开发中如何使用：
      React
        没有提供直接修改配置方式，需要将配置打包出来 yarn eject
        修改webpack配置，在postcss-loader中添加postcss-px2rem插件
          这个插件会自动将px装换成rem单位，这样写代码就可以直接写设置设计稿的px值，不用再计算如何将px转rem
        在 public/index.html 添加一个更好的meta标签
        添加一个动态修改html标签字体大小的js代码  
          设置body字体为16px
          动态设置html字体大小 为 设备宽度 / 3.75
          当你调整窗口大小或进行浏览器回退操作会重新设置html字体大小
      Vue
        vue-cli@4
        添加一个修改webpack配置的文件 vue.config.js
        加上以下配置：
          module.exports = {
            css: {
              loaderOptions: {
                postcss: {
                  // 这里的选项会传递给 postcss-loader
                  plugins: [
                    require('postcss-px2rem')({
                      remUnit: 100, // 1rem等于多少px
                    })
                  ]
                }
              }
            }
          }
        在 public/index.html 添加一个更好的meta标签
        添加一个动态修改html标签字体大小的js代码    
      
          

*/