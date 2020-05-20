/*
  在NodeJS中操作MongoDB --> mongoose

  1. 下载mongoose
    npm init -y
    npm i mongoose
  2. 使用mongoose
*/

// 引入mongoose
const mongoose = require("mongoose");

// 连接本地mongodb数据库
/*
  mongodb://localhost:27017 mongodb服务地址
  class1108_test 数据库名称
*/
mongoose.connect("mongodb://localhost:27017/class1108_test", {
  // 解决运行时三个警告
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// 创建Schema：用来对集合中数据进行类型约束
const studentsSchema = new mongoose.Schema({
  // 约束有哪些字段要存储？字段类型是什么？是不是必要的？
  name: {
    // 字段叫name，类型是字符串
    type: String,
    required: true, // 必要的
    unique: true, // 唯一的
  },
  age: Number,
  sex: {
    // 男/女 1/0
    type: Number,
    default: 1, // 默认值
  },
  hobby: {
    type: [String],
    default: [],
  },
  info: mongoose.SchemaTypes.Mixed, // 混合类型，任意类型
});

// 创建集合（Model）
/*
  mongoose.model(集合名称, 约束条件)
*/
const Students = mongoose.model("students", studentsSchema);

// 创建文档对象（Document）
const stu = new Students({
  name: "laoyang",
  age: 38,
  // sex: 1,
  hobby: ["唱", "跳", "rap", "篮球"],
  info: "鸡你太美",
  xxx: "123456789", // 如果Schema没有的字段是不会保存到数据库中的
});

// 保存起来
stu
  .save()
  .then(() => {
    console.log("保存成功~");
  })
  .catch((err) => {
    console.log("保存失败", err);
  });
