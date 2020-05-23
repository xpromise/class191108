const express = require("express");
const path = require("path");
const app = express();

app.use(
  express.static(
    path.resolve(__dirname, "build"),
    { maxAge: 3600000 } // 设置资源的强制缓存时间 1 小时
  )
);

app.listen(9527, "localhost", (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("服务器启动成功~");
});
