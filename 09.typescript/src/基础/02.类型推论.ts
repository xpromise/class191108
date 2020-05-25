/*
  类型推论：如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
*/

// 包裹一个匿名函数，防止与外面文件命名冲突
(() => {
  // 正常
  let a: number = 123;

  // 类型推论: 推论为number类型
  let b = 123; // let b: number = 123;
  // b = true;

  // 类型推论: 推论为any类型
  let c; // let c: any;
  c = 123;
  c = 'string';
  c = true;

})()