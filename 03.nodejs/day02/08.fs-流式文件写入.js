/*
  简单文件写入 -- 一般用于小文件
  流式文件写入 -- 一般用于大文件
    fs.createWriteStream()
*/

const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, 'c.txt');
// 创建可写流
const ws = fs.createWriteStream(filepath);

// 绑定事件：监听流式文件写入是否结束
// on 绑定的是持久性事件
// once 绑定的是一次性事件（执行完事件后会自动解绑）
ws.once('open', () => {
  console.log('可写流打开了~');
})

ws.once('close', () => {
  console.log('可写流关闭了~');
})

// 往可写流中塞数据
ws.write('锄禾日当午~~~');
ws.write('汗滴禾下土~~~');
ws.write('水质盘中餐~~~');
ws.write('粒粒皆辛苦~~~');

// 关闭可写流
ws.end();