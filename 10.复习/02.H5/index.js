/*
  本地存储 WebStorage
    localStorage 持久化存储数据
    sessionStorage 会话/临时存储数据
      xxxStorage.setItem(key, value) 存储数据
      xxxStorage.getItem(key) 读取数据
      xxxStorage.removeItem(key) 删除单条数据
      xxxStorage.clear() 清空所有数据
    开发中的使用：
      1. 保存用户的登录信息 localStorage
        一旦用户登录成功，返回token
        需要将token存到 localStorage 中
        下次重新访问时，从localStorage读取token，
        发送请求到后台判断token是否合法（防止用户伪造），来判断有无登录 

      2. 用户关闭页面后，保留当前用户操作内容
        比如说：用户在操作表单数据，当关闭页面时，保留用户的非敏感数据，下次打开要显示
        事件只要绑定一次
          window.addEventListener('unload', () => {
            // 关闭浏览器之前触发
            localStorage.setItem('xxx', xxx);
          })
        在Vue中 created生命周期函数中 
        在React中 componentDidMount生命周期函数中
          读取localStorage.getItem('xxx');，然后显示

    跨页面通信：
       当你绑定storage事件 
        window.addEventListener('storage', (e) => {  
          // 一旦同源（协议/域名/端口号）页面设置localStorage
          // 就会触发当前事件
          // 通过e得到别的页面保存的内容
        })
        A 页面绑定storage事件 一旦B页面设置localStorage
        A页面就能通过storage事件得到B页面设置的内容（B页面将数据发送给A页面）

     登录功能实现：
        1. cookie
          将token存在cookie中响应给客户端
          此时cookie会自动在客户端存储起来，并且以后发请求会自动携带上
          所以当前方案客户端不需要做任何处理（不需要设置axios拦截器，也不需要localStorage存储）
        2. localStorage
          发送请求登录，登录成功返回响应，响应数据中有一个token
          设置axios请求拦截器，下次发送请求时携带在headers.authorization = Bearer token
          持久化存储就得存在localStorage中了

*/