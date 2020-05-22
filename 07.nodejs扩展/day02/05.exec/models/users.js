/*
  students集合模块
*/

const mongoose = require("mongoose");

// 创建Schema约束对象
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

// 创建集合Model
const Users = mongoose.model("users", usersSchema);

module.exports = Users;
