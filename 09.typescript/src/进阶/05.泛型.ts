(() => {
  // 问题：参数value和返回值没有精确的类型
  function createArray1(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }

  createArray1(3, "x"); // ['x', 'x', 'x']

  // 泛型
  function createArray2<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  // 指定泛型参数类型为string
  createArray2<string>(3, "x");
  createArray2<number>(3, 123);
  // 不指定泛型参数类型，会类型推论
  createArray2(3, true);

  // 指定多个参数泛型
  function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]];
  }
  swap<number, string>([1, "hello"]);

  // 泛型约束
  interface LengthList {
    length: number;
  }

  function log<T extends LengthList>(x: T): T {
    // 因为不确定泛型参数类型，所以不能随意使用属性方法
    // console.log(x.length); // error
    // 泛型类型必须是Length类型，所以一定有length，此时就不会报错了
    console.log(x.length);
    return x;
  }
  log({ length: 1 });

  // 类似于
  function log1(x: LengthList): LengthList {
    console.log(x.length);
    return x;
  }

  // 泛型接口
  interface CreateArrayFn {
    <T>(length: number, value: T): Array<T>;
  }
  // 问题就是 createArray3 变量默认是没有类型。是经过类型推论出来了
  let createArray3: CreateArrayFn = function <T>(
    length: number,
    value: T
  ): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  };

  // 泛型类
  class Count<T> {
    public value: T;
    public constructor(value: T) {
      this.value = value;
    }
    public add(x: T, y: T): void {
      console.log(x, y);
    }
  }
  // 在使用是指定泛型类型
  const c = new Count<number>(1);
  c.add(1, 2);

  // 泛型参数默认值
  function createArray4<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }

  // OK
  createArray4(5, "x");
  createArray4(5, true);
  createArray4<boolean>(5, true);
})();
