/*  
  定义缓存
*/
// 怎么判断nodejs有没有(nodejs官网)，nodejs没有就需要下载安装 npm i etag
const etag = require("etag");

/**
 * 判断是否命中协商缓存方法
 * @param {*} stats 文件内容，通过fs.stat生成
 * @param {*} req 请求对象
 * @return {Boolean} true 命中 false 没有命中
 */
function checkCache(stats, req) {
  // 1. 首先要获取客户端发送的 If-None-Match If-Modified-Since
  const ifNoneMatch = req.headers["if-none-match"]; // 属性名都是小写~
  const ifModifiedSince = req.headers["if-modified-since"]; // 属性名都是小写~

  // 2. 判断 If-None-Match 和 服务器保存的 Etag 是否相等
  const eTag = etag(stats); // 生成基于文件内容的唯一标识
  if (ifNoneMatch && ifNoneMatch === eTag) {
    return true;
  }

  // 3. 判断 If-Modified-Since 和 服务器保存的 Last-modified 是否相等
  // 获取文件上一次修改时间 - 转换成GMT格式
  const lastModified = new Date(stats.mtime).toGMTString();
  if (ifModifiedSince && ifModifiedSince === lastModified) {
    return true;
  }

  // 如果都不相等
  return false;
}

/**
 * 设置缓存的方法
 * @param {*} stats 文件内容，通过fs.stat生成
 * @param {*} res 响应对象
 */
function setCache(stats, res) {
  // 设置强制缓存
  res.setHeader("Cache-Control", "max-age=3600, public");
  res.setHeader("Expires", new Date(Date.now() + 3600).toGMTString());
  // 设置协商缓存
  res.setHeader("Etag", etag(stats));
  res.setHeader("Last-modified", new Date(stats.mtime).toGMTString());
}

/**
 * 缓存
 * @param {*} stats 文件内容，通过fs.stat生成
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 * @return {Boolean} true 命中 false 没有命中
 */
function cache(stats, req, res) {
  /*
    1. 判断浏览器是否命中缓存？
      强制缓存：强制缓存一旦命中，就不会发送请求（自然服务器就接受不到）
      协商缓存：只要判断协商缓存（一旦接受到请求，要么没有缓存，要么走协商缓存）
  */

  const isCache = checkCache(stats, req);

  if (isCache) {
    // 命中缓存 - 设置响应状态码为304
    res.statusCode = 304;
    res.end();
    return true;
  }

  // 没有命中缓存: 1. 缓存过期了 2. 第一次访问，之前没有设置过缓存
  // 重新设置新的缓存
  setCache(stats, res);
  return false;
}

module.exports = cache;
