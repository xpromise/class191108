/*
  函数
*/

(() => {
  // 函数声明
  function fn1(x: number, y: string): string {
    return x + y;
  }
  // 函数表达式
  // 默认类型推论给fn2推论为右边函数类型
  const fn2 = function (x: number, y: string): string {
    return x + y;
  };

  // fn3: (x: number, y: string) => string 代表fn3变量的类型是一个函数
  const fn3: (x: number, y: string) => string = function (
    x: number,
    y: string
  ): string {
    return x + y;
  };

  const fn4: (x: number, y: string) => string = (
    x: number,
    y: string
  ): string => {
    return x + y;
  };

  const fn5: (x: number, y: string) => string = (
    x: number,
    y: string
  ): string => x + y;

  interface Func {
    (x: number, y: string): string; // 函数类型
    // name: string // 普通对象属性
  }

  const fn6: Func = (x: number, y: string): string => x + y;
  // 可选参数
  function fn7(x: number, y?: string, z?: string): number {
    console.log(y);
    return x + Number(y);
  }
  // 可选参数后面不允许再出现必需参数了
  // function fn8(y?: number, x: number): number { // error
  //   console.log(y);
  //   return x;
  // }
  // 参数默认值
  function fn9(x: number, y: string = "hello"): number {
    return x + Number(y);
  }
  // 使用参数默认值，就不用遵守：可选参数后面不允许再出现必需参数了
  function fn10(y: string = "hello", x: number): number {
    return x + Number(y);
  }

  // 剩下所有参数
  function fn11(a: number, ...args: number[]): void {
    console.log(a); // 2
    console.log(args); // [3, 4, 5, 6]
  }
  fn11(2, 3, 4, 5, 6);

  // 重载

  // 问题：传入number类型，不能知道返回值类型多少
  function reverse(x: number | string): number | string {
    if (typeof x === "number") {
      return Number(x.toString().split("").reverse().join(""));
    } else {
      return x.split("").reverse().join("");
    }
  }

  reverse(123);
  reverse("string");

  // 使用重载：定义多次函数，最终会合并成一个
  function reverse1(x: number): number;
  function reverse1(x: string): string;
  function reverse1(x: number | string): number | string {
    if (typeof x === "number") {
      return Number(x.toString().split("").reverse().join(""));
    } else {
      return x.split("").reverse().join("");
    }
  }

  reverse1(123);
  reverse1("string");
  
})();
