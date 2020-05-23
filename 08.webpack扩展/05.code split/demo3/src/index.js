// 动态导入语法
import("./math")
  .then((math) => {
    console.log("模块加载成功");
    console.log(math.add(2, 3));
    console.log(math.mul(3, 3));
  })
  .catch((err) => {
    console.log("模块加载失败", err);
  });
