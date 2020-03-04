

const fs = require('fs')
const path = require('path')

const inputFilePath = 'D:\\录制视频\\08.简单文件写入.mp4';
const outputFilePath = path.resolve(__dirname, 'd.mp4');
// 创建可读流 会自动关闭
const rs = fs.createReadStream(inputFilePath);
// 创建可写流 不会自动关闭，需要手动关闭
const ws = fs.createWriteStream(outputFilePath);

/* rs.on('data', (chunk) => {
  // 当数据读取出来，要写入成另外一个文件
  ws.write(chunk);
})
.once('end', () => {
  // 可读流全部读取完毕了，关闭可写流
  ws.end();
}) */

// pipe会持续性消费可读流数据
// 将可读流数据写入到可写流中
// 会自动关闭可写流
rs.pipe(ws);