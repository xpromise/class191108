/*
 用来连接mongoDB数据库模块
*/

const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost:27017/exec", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// 判断连接数据库有无成功
// once绑定一次性事件
mongoose.connection.once("open", (err) => {
  if (err) {
    console.log("连接数据库失败", err);
    return;
  }
  console.log("连接数据库成功~");
});

// 模块需不需要向外暴露内容？看模块内部有没有外部需要的东西
// mongoose外面就有，所以不需要暴露