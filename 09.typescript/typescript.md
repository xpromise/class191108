# TypeScript

## 介绍
1. 什么是 TypeScript
   TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

   TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

2. 为什么选择 TypeScript

- TypeScript 增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
  - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
  - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
- TypeScript 非常包容
  - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
  - 即使不显式的定义类型，也能够自动做出类型推论
  - 可以定义从简单到复杂的几乎一切类型
  - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
  - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
- TypeScript 拥有活跃的社区
  - 大部分第三方库都有提供给 TypeScript 的类型定义文件
  - Google 开发的 Angular2 就是使用 TypeScript 编写的
  - TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

## 安装

1. 安装

```js
npm install -g typescript
```

2. 编译

```js
tsc hello.ts
```

## 初体验

1. hello.ts

```ts
function sayHello(person: string) {
  return "Hello, " + person;
}

let user = "Tom";
console.log(sayHello(user));
```

2. 使用 VSCODE 自动监视 TS 文件变化

- 初始化 tsconfig.json
  ```
  tsc --init
  ```
- 终端 -> 运行任务 -> typescript -> 监视

## 配置 Webpack 自动编译 TS 文件

1. 配置文件 webpack.config.js

```js
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // 模式
  mode: "development",
  // 入口
  entry: "./src/index.ts",
  // 输出
  output: {
    path: undefined,
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: "/",
  },
  // loader
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 插件
  plugins: [
    // 处理Html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // HMR功能插件
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`,
    },
  },
  resolve: {
    // 自动补全文件扩展名
    extensions: [".ts", ".js", ".json"],
  },
  devServer: {
    compress: true, // 开启gzip压缩
    contentBase: path.resolve(__dirname, "public"),
    host: "localhost",
    port: 9527,
    open: true, // 自动打开浏览器
    hot: true, // 开启HMR功能
    stats: "errors-warnings", // 只输出错误和警告信息
  },
};
```

2. package.json 配置启动指令

```json
"scripts": {
  "start": "webpack-dev-server"
}
```

## TypeScript 基础

### 数据类型

1. 基本类型
   Number、String、Boolean、Null、Undefined

```ts
// Number
let a: number = 123;
// a = 'str'; // TS2322: Type '"str"' is not assignable to type 'number'.
// String
const b: string = "hello";
// Boolean
const c: boolean = true;
// Null
const d: null = null;
// Undefined
const e: undefined = undefined;
```

2. 引用类型
   Object、Function、Array

```ts
// Object
// 接口
interface Person {
  name: string;
  age: number;
}
const p: Person = {
  name: "jack",
  age: 18,
};
// Function
function fn(a: string, b: number): string {
  return a + b;
}
// Array
const arr1: number[] = [1, 2, 3];
// 数组泛型
const arr2: Array<string> = ["1", "2", "3"];
```

3. TS 扩展类型

- 元组 Tuple: 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
- 枚举 Enum: 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
- 任意值 Any：用来表示允许赋值为任意类型。
- 空值 Void: 与 Any 相反，用来表示没有任何类型
- 永不存在的值 Never：表示的是那些永不存在的值的类型

```ts
// 元组 Tuple
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
// 枚举 Enum
function fn(a: string, b: number): string {
  return a + b;
}
// 任意值 Any
let y: any = 123;
y = "hello";
y = false;
// 空值 Void
// 表示函数没有返回值
function fn(): void {}
// 永不存在的值 Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
// 推断的返回值类型为never（类型推断）
function fail() {
  return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```
