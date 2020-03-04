/*
  简单读取文件
    fs.readFile()
*/

const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname, '03.path.js');

fs.readFile(filepath, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('读取文件成功~');
  // 读取的数据是Buffer数据（里面保存二进制数据）
  // 将Buffer数据转换成字符串
  console.log(data.toString());
})
