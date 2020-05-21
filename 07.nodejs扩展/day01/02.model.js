const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://localhost:27017/class1108_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
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

// 通过集合Model对数据库直接操作
/*
  CRUD
    所有方法返回值是一个promise
    Model.create(文档对象) 
    Model.find(查询条件, 投影) (找没找到)返回值是数组
    Model.findOne(查询条件, 投影)
    Model.updateOne(查询条件, 更新的内容)
    Model.updateMany(查询条件, 更新的内容)
    Model.deleteOne(查询条件)
    Model.deleteMany(查询条件)
*/

(async function () {
  try {
    /* const result = await Students.create({
      name: "laoyang1",
      age: 40,
      hobby: ["跳舞", "唱歌"],
      info: "今天你交作业了吗",
    }); */

    /* const result = await Students.find(
      { age: { $gte: 40 } },
      { name: 1, age: 1, _id: 0 }
    ); */
    // const result = await Students.find({ age: { $gte: 50 } });

    // const result = await Students.findOne(); // 找到了返回值是对象
    // const result = await Students.findOne({ age: { $gte: 50 } }); // 没有找到返回值null

    // find方法怎么判断有没有找到数据？
    // if (result.length) {
    // console.log("找到数据了：", result);
    // }

    // findOne方法怎么判断有没有找到数据？
    // if (result) {
    //   console.log("找到数据了：", result);
    // }

    const result = await Students.find();
    // const result = await Students.updateOne({name: 'peihua'}, {$inc: {age: 1}});

    console.log(result);
  } catch (e) {
    console.log("error", e);
  }
})();
