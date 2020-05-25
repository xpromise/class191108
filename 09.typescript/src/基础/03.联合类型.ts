/*
联合类型（Union Types）表示取值可以为多种类型中的一种。
*/

(() => {
  // 变量a 可以是number/string/boolean类型
  let a: number | string | boolean;

  a = 123;
  a = "string";
  a = true;
  // a = null; // error;

  function fn(x: string | number) {
    // 当我们使用联合类型定义参数
    // 使用参数的属性方法必须是联合类型类型公共的属性方法才行
    // return x.length; // error length属性number没有
    return x.toString(); // ok toString()是公共的方法
  }
})();
