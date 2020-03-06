/*
  process 进程
    argv 获取运行指令的文件后面的命令行参数
    argv0 获取nodejs程序目录
    execArgv 获取运行指令的文件前面的命令行参数
    env 获取系统环境变量
      环境变量：Path --> 遍历每个路径，找到程序运行
    cwd() 当前程序运行绝对路径
    exit([code]) 退出进程
*/

// 运行指令: node --inspect .\02.process.js hello process
/*
  [
    // nodejs程序目录
    'D:\\software\\nodejs\\node.exe',  
    // 当前运行文件绝对路径
    'C:\\Users\\XiongJian\\Desktop\\class191108\\03.nodejs\\day02\\02.process.js' 
    'hello',
    'process'
  ]
*/
// console.log(process.argv);
// console.log(process.argv0);
// ['--inspect']
// console.log(process.execArgv);
// console.log(process.env);

// console.log(process.cwd()); // C:\Users\XiongJian\Desktop\class191108\03.nodejs\day02

let i = 0;

/*
  怎么终止nodejs程序：
    1. 手动终止： ctrl + c
    2. process.exit() 
*/  

setInterval(() => {
  console.log('定时器执行了:', ++i);
  if (i > 10) {
    process.exit();
  }
}, 1000)


