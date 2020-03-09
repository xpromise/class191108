/*
  用来压缩文件
*/

const { createGzip, createDeflate } = require("zlib");

/**
 * 压缩
 * @param {*} rs 可读流
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 * @return rs 可读流
 */
function compress(rs, req, res) {
  // 1. 判断浏览器支不支持压缩
  const acceptEncoding = req.headers["accept-encoding"];
  if (acceptEncoding) {
    // 2. 支持哪种压缩
    const acceptEncodingArr = acceptEncoding.split(", ");

    // 首先判断gzip
    if (acceptEncodingArr.indexOf("gzip") !== -1) {
      // 设置响应头，告诉客户端，内容经过了压缩
      res.setHeader("Content-Encoding", "gzip");
      // rs可读流会将数据读取传给gzip压缩，返回值还是一个rs（可读流中的数据已经压缩了~）
      rs = rs.pipe(createGzip());
      return rs;
    }

    // 再判断deflate
    if (acceptEncodingArr.indexOf("deflate") !== -1) {
      res.setHeader("Content-Encoding", "deflate");
      return rs.pipe(createDeflate());
    }
  }

  return rs;
}

module.exports = compress;
