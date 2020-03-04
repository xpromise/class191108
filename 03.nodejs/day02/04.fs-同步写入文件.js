/*
  fs 文件系统
    1. 写入文件
      同步写入
        打开文件
          fs.openSync()
        写入内容
          fs.wirteSync()
        关闭文件
          fs.closeSync()
      异步写入
    2. 读取文件

    3. 扩展
*/

const fs = require('fs');
const path = require('path');

// 打开文件
const filepath = path.resolve(__dirname, 'a.txt');
// fd 文件描述符：代表打开文件的唯一标识~
// 如果文件存在，就打开，如果文件不存在，会自动创建该文件
// 'w' 写入内容会覆盖之前的内容
// 'a' 追加内容
const fd = fs.openSync(filepath, 'a');
console.log(fd);
// 写入内容
// 返回值result 是写入的字节铲长度
const result = fs.writeSync(fd, '汗滴禾下土~');
console.log(result); // 22
// 关闭文件
fs.closeSync(fd);