// 1. 基本类型 Number、String、Boolean、Null、Undefined、Symbol

// 定义变量a，它的类型是number，值为123
let a: number = 123;
// a = 'hello';

const b: string = "hello atguigu";

const c: boolean = true;

const d: null = null;

const e: undefined = undefined;

const f: symbol = Symbol();

// 引用类型 Object、Function、Array
// 接口
interface Person {
  name: string;
  age: number;
}
// 对象
const p: Person = {
  name: "jack",
  age: 18,
};

// 函数
function add(x: number, y: number): number {
  return x + y;
}

add(1, 2);
// 数组
const arr1: number[] = [1, 2, 3];
const arr2: Array<string> = ["1", "2", "3"];

// 元组 Tuple: 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
// 元组是特殊的数组：确定长度和确定每个值的类型的数组
let x: [number, string];
x = [1, "hello"];
// x = ['hello', 111]; // error
// x = [2, 'hello', true]; // error

// 枚举 Enum: 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
enum Color {
  red,
  green,
  blue,
}
// 枚举的值默认从0开始，依次增加
console.log(Color["red"]); // 0
console.log(Color["green"]); // 1
console.log(Color["blue"]); // 2
// 实现了相互赋值
console.log(Color[0]); // red
console.log(Color[1]); // green
console.log(Color[2]); // blue

enum Color1 {
  red = 3,
  green,
  blue = 1,
}
console.log(Color1["red"]); // 3
console.log(Color1["green"]); // 2
console.log(Color1["blue"]);

// 任意值 Any：用来表示允许赋值为任意类型。
let z: any = 123;
z = true;
z = "string";

// 等价于
let o; // 类型推论 --> any
o = 123;
o = "string";
o = true;

// 空值 Void: 与 Any 相反，用来表示没有任何类型
// 通常用来表示函数没有返回值，返回值就没有类型
function fn(): void {}

// 永不存在的值 Never：表示的是那些永不存在的值的类型
// 一定会报错的类型
function foo(): never {
  throw new Error("出错了");
}
