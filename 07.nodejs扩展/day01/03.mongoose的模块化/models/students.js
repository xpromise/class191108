/*
  students集合模块
*/

const mongoose = require("mongoose");

// 创建Schema约束对象
const studentsSchema = new mongoose.Schema({
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
  isDeleted: { // 软删除：代表当前用户有无删除
    type: Boolean,
    default: false,
  },
});

// 创建集合Model
const Students = mongoose.model("students", studentsSchema);

// 模块需不需要向外暴露内容？
// 暴露Students，让外部能通过Students操作数据库
module.exports = Students;
