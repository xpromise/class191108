/*
  流式读取文件
    fs.createReadStream()
*/

const fs = require("fs");
const path = require("path");
// 必须写双斜杠：第一斜杠是转义符
// const filepath = 'D:\\录制视频\\08.简单文件写入.mp4';
const filepath = path.resolve(__dirname, 'a.txt');
// 创建可读流
const rs = fs.createReadStream(filepath);

// 可读流默认情况下，只会读取一次数据（64kb）
// 消费读取的这个数据，可读流就会自动读取下一次数据
let string = '';

// nodejs的设计一般都可以链式调用  $('body').css().html().xxx()
rs
  .on('data', (chunk) => {
    /*
      chunk就是可读流读取的数据, 大小为64kb
      data事件就是消费可读取读取的数据
      持续性事件会一直消费可读流~ 直到所有内容全部读取完毕，可读流会自动关闭~
    */
    // console.log(chunk.toString());
    string += chunk.toString();
  })
  .once('end', () => {
    // 可读流关闭事件 --> 说明数据全部读取完了
    console.log(string);
  })

