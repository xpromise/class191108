/*
  如何在nodejs中调试代码？
    1. 在chrome调试nodejs代码
      --inspect 启动调试
      -brk 在代码的第一行打一个断点
      node --inspect-brk xxx
    
    2. 在VSCODE调试nodejs代码  
*/

function max() {
  const a = Math.round(Math.random() * 100);
  const b = Math.round(Math.random() * 100);
  const result = Math.max(a, b);
  return result;
}

const arr = [];

for (let i = 0; i < 10; i++) {
  const result = max();
  arr.push(result);
}

console.log(arr);
