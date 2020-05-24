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
// 推断的返回值类型为never（类型推论）
function fail() {
  return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```ts
let num = 7;
num = "7"; // error

// 上面代码等价于
let num: number = 7;
num = "7"; // error
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

```ts
let num;
num = 7;
num = "7";
```

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
// 联合类型使用 | 分隔每个类型。
let num = string | number;
num = 7;
num = "string";
num = true; // error
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```ts
// toString() 是string 和 number 的共有属性
function getString(something: string | number): string {
  return something.toString(); // ok
}

// length 不是 string 和 number 的共有属性
function getString(something: string | number): string {
  return something.length; // error
}
```

### 对象类型-接口

1. 什么是接口
   在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
   TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

2. 简单的例子
   **赋值的时候，变量的形状必须和接口的形状保持一致**。

```ts
// 接口一般首字母大写
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};

// 定义的变量比接口少了一些属性是不允许的
let jack: Person = {
  name: "Jack", // error
};

// 多一些属性也是不允许的
let jerry: Person = {
  name: "Jerry",
  age: 25,
  gender: "male", // error
};
```

3. 可选属性

```ts
interface Person {
  name: string;
  age?: number;
}
// 可选属性的含义是该属性可以不存在, 也可以存在
let tom: Person = {
  name: "Tom",
};

let jerry: Person = {
  name: "Jerry",
  age: 25,
};
// 仍然不允许添加未定义的属性
let jack: Person = {
  name: "Jack",
  age: 25,
  gender: "male", // error
};
```

4. 任意属性

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**

```ts
// 任意属性的值允许是 string
// 但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了
interface Person {
  name: string;
  age?: number; // error
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

```ts
interface Person {
  name: string;
  age: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

5. 只读属性
   有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: "Tom",
  gender: "male",
};
// 只读属性不能重新赋值
tom.id = 9527; // error
```

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：**

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};

tom.id = 89757; // error
```

### 数组类型

1. 「类型 + 方括号」表示法

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

2. 数组泛型
3. 用接口表示数组
4. 类数组
5. any 在数组中的应用

## 类的概念

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
