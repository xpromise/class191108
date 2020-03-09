/*
  配置命令行参数
*/
// npm i yargs
const yargs = require("yargs");

const argv = yargs
	.usage("server [options]")
	.option("p", {
		// 配置指令选项
		alias: "port", // 配置别名
		describe: "端口号", // 描述
		default: 3000 // 默认值
	})
	.option("h", {
		// 配置指令选项
		alias: "host", // 配置别名
		describe: "主机名", // 描述
		default: "localhost" // 默认值
	})
	.option("d", {
		alias: "root",
		describe: "运行项目的更目录",
		default: process.cwd()
	})
	.version() // 增加 -v 指令， 查看版本号
	.alias("v", "version") // 对 v 进行配置别名：version
	.help().argv; // 增加 --help 指令，查看帮助

module.exports = argv;
