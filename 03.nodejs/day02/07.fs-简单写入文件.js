/*
  简单写入文件

  fs.writeFile()
  fs.writeFileSync()
*/

const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname, "b.txt");

fs.writeFile(filepath, "思慧唱歌真好听~~~", { flag: "a" }, err => {
  // 优先处理错误~
  if (err) {
    console.log(err);
    return;
  }
  console.log("文件写入成功~");
});
