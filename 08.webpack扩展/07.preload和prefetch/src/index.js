// 动态导入语法
document.getElementById("btn").onclick = function () {
  // math.js就会懒加载
  /*
    预加载：等待页面其他资源加载完毕，在偷偷加载后面需要使用的资源

    preload 预加载，当前页面需要使用的资源（当前必须要使用）
    prefetch 预加载，下一个页面需要使用的资源（当前还不需要使用）
      <link rel="prefetch" as="script" href="./js/math.chunk.js">

    页面加载JS资源优先级：
      普通 script
      其次 script 加上 async defer 属性
      最后 preload prefetch
    
    问题：存在兼容性问题~  
  */
  import(/* webpackChunkName: "math", webpackPrefetch: true */ "./math")
    .then((math) => {
      console.log("模块加载成功");
      console.log(math.add(2, 3));
      console.log(math.mul(3, 3));
    })
    .catch((err) => {
      console.log("模块加载失败", err);
    });
};

import(/* webpackChunkName: "load", webpackPreload: true */ "./load")
  .then(() => {
    console.log("load模块加载成功");
  })
  .catch((err) => {
    console.log("模块加载失败", err);
  });
