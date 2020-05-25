/*
  数组
*/

(() => {
  // 1. 「类型 + 方括号」表示法
  const a: number[] = [1, 2, 3];
  // 2. 数组泛型
  const b: Array<string> = ["1", "2"];
  // 3. 接口表示数组(太复杂，一般不用)
  interface ArrayList {
    [index: number]: boolean; // 任意属性
  }
  const c: ArrayList = [true, false];
  // 4. any
  const d: any[] = [1, "string", true];
})();
