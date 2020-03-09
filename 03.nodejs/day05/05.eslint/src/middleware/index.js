/*
  中间件函数
    用来处理请求、返回响应的功能函数
*/
const path = require("path");
const fs = require("fs");
const util = require("util");
const pug = require("pug");

const getMimeType = require("../utils/mime");
const compress = require("../utils/compress");
const cache = require("../utils/cache");

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
// const readFile = util.promisify(fs.readFile);

module.exports = root => {
	return async (req, res) => {
		// 处理请求的回调函数
		// 获取请求路径  /src
		const url = req.url;
		// 组成绝对路径
		const filePath = path.resolve(root, `.${url}`);

		try {
			// 分析文件路径，返回一个stats
			const stats = await stat(filePath);

			// 但是还要判断是文件还是文件夹
			if (stats.isDirectory()) {
				// 说明是文件夹
				// 读取文件夹里面的内容
				const files = await readdir(filePath);

				// 渲染pug成html
				const pugFilePath = path.resolve(__dirname, "../views/index.pug");
				const html = pug.renderFile(pugFilePath, { files, url });

				// 返回响应
				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html;charset=utf8");
				res.end(html);

				return;
			}

			if (stats.isFile()) {
				// 说明是文件
				// 读取文件里面的内容
				// const data = await readFile(filePath);
				let rs = fs.createReadStream(filePath);

				// 缓存控制
				const isCache = cache(stats, req, res);
				// 如果命中缓存，在函数中已经设置 statusCode 和 end，就不需要接着执行了
				if (isCache) return;

				// 获取文件mimeType
				const mimeType = getMimeType(filePath);

				// 判断如果文件是 js / css / html / json ，才进行压缩
				if (mimeType.match(/(javascript|css|html|json)/)) {
					// 对文件进行压缩
					rs = compress(rs, req, res);
				}

				// 返回响应
				res.statusCode = 200;
				res.setHeader("Content-Type", `${mimeType};charset=utf8`);
				rs.pipe(res);
				// res.end(data);
				return;
			}
		} catch (e) {
			console.log(e);
			// 说明以上异步方法有一个出错了~
			// 说明文件找不到，返回404
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/plain;charset=utf8");
			res.end(`${url} 不是一个文件或文件夹`);
		}
	};
};
