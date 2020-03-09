/*
  缓存：
    强制缓存：优先级高
      特点：直接走缓存，不会重新发送请求

      HTTP 1.1(主流)(优先级高)
        Cache-Control: max-age=3600, public
      HTTP 1.0(只能老版本浏览器使用)
        Expires: new Date(Date.now() + 3600).toGMTString()

      策略：
        1. 服务器返回 Cache-Control 给客户端
        2. 下一次客户端发送请求时，会自动检查 Cache-Control 是否过期
        3. 没有过期，直接读取缓存，不会发送请求
        4. 过期了，重新发送请求

    协商缓存：优先级低
      特点：一定向服务器发送请求，由服务器指定要不要走缓存

      位于响应头
        Etag 文件内容唯一标识
        Last-modified 文件上次修改时间
      位于请求头
        If-None-Match 代表上一次Etag的值
        If-Modified-Since 代表上一次Last-modified的值

      策略：
        1. 服务器返回 Etag / Last-modified 给客户端
        2. 客户端存起来，下一次发送请求时会自动携带上
          此时，为了避免命名冲突：
            将 Etag 改成 If-None-Match
            将 Last-modified 改成 If-Modified-Since
        3. 服务器首先判断 If-None-Match 和 服务器保存的 Etag 是否相等
          相等说明文件没有修改，要走缓存
        4. 不相等，还得判断 If-Modified-Since 和 服务器保存的 Last-modified 是否相等
          相等说明文件也没有修改，要走缓存
        5. 如果都不相等，说明文件变化了，返回响应 状态码200和新的资源   
        6. 只要上面有一个相等，就走缓存，返回相应 状态304（不需要返回资源）
        7. 客户端一旦接受到响应状态码304，就会自动读取缓存
*/
