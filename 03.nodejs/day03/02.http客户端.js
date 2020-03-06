const http = require("http");

// 要请求的服务器地址
const url = "http://localhost:3000";
// 发送请求的选项
// const options = {};

// 创建客户端
const request = http.request(url, res => {
  // 接受到响应就会触发的回调函数
  // responce 响应对象

  // 响应状态码
  console.log(res.statusCode); // 200
  
  let result = '';

  res
    // 接受响应数据的事件
    .on("data", chunk => {
      result += chunk.toString();
    })
    // 响应数据接受完毕
    .on("end", () => {
      console.log('数据全部接受完毕：', result);
    });
});

// 发送请求
request.end();
