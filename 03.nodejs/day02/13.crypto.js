/*
  crypto 加密
    消息摘要加密算法 （md5 sha1 sha256 sha512）
      1. 生成的密文长度固定
      2. 同样的明文加密后一定得到同样的密文
      3. 不可逆 （不能通过密文逆向破解明文）
    
    加盐
*/

const crypto = require('crypto');

// const md5 = crypto.createHash('md5');
const md5 = crypto.createHash('sha256');

// 定义明文  必须是字符串
let password = '123456';

// 定义盐
const salt = '6TE#6gbXQO';

password = password + salt;

// md5.update(password, 'utf8') 加密处理，生成密文
// digest('hex') 装换成16进制显示
const secret = md5.update(password, 'utf8').digest('hex');
// 密文
console.log(secret); // 54269bc65b5d1be10a75645a296b78c3
