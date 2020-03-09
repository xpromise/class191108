/*
  打开浏览器
*/
const { exec } = require("child_process");

module.exports = function(url) {
  // 1. 判断当前操作系统是：windows \ Mac \ Linux
  let cmd = "";

  switch (process.platform) {
    case "darwin": // mac
      cmd = "open";
      break;
    case "win32": // windows
      cmd = "start";
      break;
    case "linux": // linux
      cmd = "xdg-open";
      break;
  }

  // 2. 在终端执行打开浏览器的指令
  exec(`${cmd} ${url}`);
};
