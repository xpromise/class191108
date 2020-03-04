/*
  events 定义事件模块

  练习题：请你实现EmiterEvents。--> 自定义事件
*/
const EmiterEvents = require('events');

class MyEmiter extends EmiterEvents {};

const myEvent = new MyEmiter();

// 自定义事件
// 绑定持久性事件
myEvent.on('aaa', (a, b) => {
  console.log('回调函数111 - aaa事件触发了~', a, b);
})

const callback = () => {
  console.log('回调函数222 - aaa事件触发了~');
};
myEvent.on('aaa', callback)

// 绑定一次性事件
myEvent.once('bbb', () => {
  console.log('bbb事件触发了~');
})

// 触发自定义事件
myEvent.emit('aaa', 123, 456);
// 解绑事件
myEvent.off('aaa', callback);

myEvent.emit('aaa');
// myEvent.emit('bbb');
// myEvent.emit('bbb');