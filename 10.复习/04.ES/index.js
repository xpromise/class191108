/*
  1. 谈谈ES6
    ES6是2015年推出JS语法规范，也是目前开发中使用很多的一个规范
    它的内容包含：
      一些较简单的语法：
        1. 定义变量 let / const
        2. 对象结构赋值 / 简写
        3. 扩展运算符（三点运算符）
        4. 模板字符串 等等
      
      也有一些较复杂语法：
        1. 箭头函数(核心点：总结this指向)
          this指向是函数调用时才会动态确定的：
            普通函数直接调用  window （在ES5严格模式下，this指向undefined）
            普通函数隐式调用（obj.fn()）  obj
            普通函数显示调用（fn.call/apply(obj)） obj
            普通函数new调用 创建出来的实例对象
            在回调函数中
              定时器普通回调函数 window（在ES5严格模式下，this指向undefined）
              DOM事件普通回调函数 被绑定的DOM元素
            在框架中
              React普通类组件的方法 undefined (bind / 箭头函数)
              React生命周期函数    组件实例对象  
              Vue函数  vm实例对象
            箭头函数 
              指向离他最近的包裹它函数的this（没有自己的this） 

        2. Promise(核心点：原理)
          是一个异步编程，解决回调地狱（回调函数嵌套多层回调函数）的方案
          内部有三种状态
            pending 初始化
            resolved / fulfilled 成功
            rejected 失败
          当你调用resolve方法，会由pending变成resolved
          当你调用rejected方法，会由pending变成rejected
          注意：状态只能改变一次~
          
          使用：new Promise(), 传入一个函数作为参数，函数中执行异步代码
          当异步代码做成功了，调用resolve方法，并将成功的结果返回出去
          当异步代码做失败了，调用rejected方法，并将失败的原因返回出去
          外面通过给new Promise()产生的实例对象promise绑定then/catch方法
          分别捕获promise成功状态和失败状态

          最后：
            Promise.resolve() 返回一个成功状态的Promise（研究源码发现，也可以返回失败的）
            Promise.reject() 返回一个失败状态的Promise
            Promise.all([promise1, promise2...]) 
              等传入多个的promises对象都成功才成功，只要有一个失败就失败

          Promise A+原理：
            resolve 功能是将pending变成resolved，并有成功结果
              内部判断当前状态是否是pending（目的为了保证状态只能改变一次），是的话才改状态值和添加结果值
              同时异步调用成功的回调函数
            reject
              内部判断当前状态是否是pending（目的为了保证状态只能改变一次），是的话才改状态值和添加原因值
              同时异步调用失败的回调函数
            then
              内部返回一个新的promise对象（目的为了链式调用）
              给绑定then方法的promise添加了成功回调和失败回调
                一旦绑定then方法的promise变成了成功状态，就会异步调用成功回调
                一旦绑定then方法的promise变成了失败状态，就会异步调用失败回调
                  当异步调用成功回调时，内部会调用then方法传入第一个回调，并根据器返回值来决定
                  then方法内部返回新的promise的状态
                  当异步调用成功回调时，内部会调用then方法传入第二个回调，并根据器返回值来决定
                  then方法内部返回新的promise的状态
                    三种情况：
                      1. 如果返回值是promise，就根据promise对象状态来改变 
                        instance of
                      2. 如果返回值不是promise，就是成功状态
                      3. 如果函数调用报错了，就是失败状态
                        try {} catch () {}

        3. async --> ES8
          async 定义函数 
          await promise 等待promise对象的执行结果 
            如果promise是成功状态，程序就会继续往下执行
            如果promise是失败状态，async会中断执行
              如果async函数绑定then/catch 就触发catch的回调
              如果async函数没有绑定，就会报错~

          async函数代码还没有执行完，返回值是pending状态
          全部执行完了 是成功状态
          一旦有报错 是失败状态     

          总结：项目中使用async函数+promise对象解决异步代码回调地狱问题~

  2. 谈谈Promise

  3. ES7 
      Array.prototype.includes() 判断数组是否存在某个元素
      ** 幂运算符
     ES8
      Async
      Object.values() 
     ES9
      Promise.finally()
     ES10
      Array.prototype.flat() 数组扁平化(将多维数组变成一维数组)

    https://juejin.im/post/5ca2e1935188254416288eb2   

  
  新的数据类型：
    基本类型
      Number String Boolean Null Undefined
    ES6 Symbol
    ES10 BigInt 数据类型的目的是比Number数据类型支持的范围更大的整数值。    

*/