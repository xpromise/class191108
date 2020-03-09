module.exports = {
	// 运行环境：识别当前环境全局变量
	env: {
		commonjs: true, // require/module/exports
		es6: true,
		node: true // process
	},
	extends: "eslint:recommended", // 继承eslint推荐规则
	globals: {
		// 单独定义识别的全局变量
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		// 解析哪些识别语法
		ecmaVersion: 2018 // es2018 --> es9
	},
	rules: {
		// 详细配置规则
		// semi是一个eslint规则，代表代码后面以 ; 结尾
		semi: "error", // 没有的 以 ; 结尾 就报红色的错误
		// semi: 'warnning', // 没有的 以 ; 结尾 就报黄色的警告
		// semi: 'false', // 不检查
		"space-infix-ops": "error" // 要求操作符周围有空格
	}
};
