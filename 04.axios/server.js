const http = require("http");

let id = 3;

const data = {
  products: [
    { id: 1, name: "iphone6", price: 6000 },
    { id: 2, name: "iphone8", price: 8000 }
  ]
};

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url === "/favicon.ico") {
    res.end();
    return;
  }

  try {
    // /products/1
    // [ 'products', '1' ]
    let [path, params] = url.slice(1).split("/");
    // 转化为整数
    params = +params;

    // [ 'products' ]
    const keys = Object.keys(data);

    let result = null;

    // 遍历
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key === path) {
        if (method === "GET") {
          // 如果是GET 是查询数据
          // 如果有params，说明是查询单条数据
          if (params) {
            // 找到它
            result = data[key].find(item => item.id === params);
            break;
          }
          // 没有params，代表查询所有
          result = data[key];
          break;
        }

        if (method === "DELETE") {
          // 删除某一条数据
          data[key] = data[key].filter(item => item.id !== params);
          result = {};
          break;
        }

        // 来到下面说明要接受body参数
        const body = await new Promise((resolve, reject) => {
          let body = "";
          req
            .on("data", chunk => {
              body += chunk.toString();
            })
            .on("end", () => {
              resolve(body);
            });
        });

        if (method === "POST") {
          result = {
            id: id++,
            ...body
          };
          data[key].push(result);
          break;
        }

        if (method === "PUT") {
          data[key].map(item => {
            if (item.id === params) {
              item = {
                ...item,
                ...body
              };
              result = item;
            }
            return item;
          });
          break;
        }
      }
    }
    // 延时5秒~ 模拟网络延迟，方便测试取消ajax请求
    setTimeout(() => {
      sendResponse(res, result);
    }, 5000);
  } catch (e) {
    sendResponse(res, e);
  }
});

function sendResponse(res, data) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Method",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", 86400);
  res.setHeader("Content-Type", "application/json;charset=utf8");
  res.end(JSON.stringify(data));
}

server.listen(3000, "localhost", err => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  console.log("服务器启动成功, http://localhost:3000");
});
