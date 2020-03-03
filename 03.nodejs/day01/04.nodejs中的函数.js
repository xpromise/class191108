/*
  每一个模块都是私有的，除非通过暴露语法向外暴露内容

  nodejs中所有模块默认使用commonjs模块化，使用commonjs模块化给所有模块包裹一层函数
  这个函数会将模块化的变量传入进去  

  function (exports, require, module, __filename, __dirname) {}
    exports  暴露模块
    require  引入模块
    module   module.exports 暴露模块
    __filename 当前文件的绝对路径
    __dirname  当前文件的文件夹绝对路径
*/

// console.log(arguments.callee.toString()); 
console.log(__filename); // C:\Users\XiongJian\Desktop\class191108\03.nodejs\day01\04.nodejs中的函数.js
console.log(__dirname); // C:\Users\XiongJian\Desktop\class191108\03.nodejs\day01



