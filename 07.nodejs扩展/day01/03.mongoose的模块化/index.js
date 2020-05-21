// 使用mongoose
// 连接数据库
require("./db"); // 加载db/index.js模块，从而执行内部代码。最终连接数据库
// 操作数据库
const Students = require("./models/students");
const Teachers = require("./models/teachers");

(async () => {
  await Teachers.create({
    name: "小明",
    age: 18,
    sex: 1,
    info: "~~~~~",
  });

  console.log("数据创建成功~");
})();
