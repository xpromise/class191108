/*
  接口
*/

(() => {
  // 基本使用
  interface Person {
    name: string; // 确定属性 
    age: number;
    sex?: string; // 可选属性
    // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
    [propName: string]: any // 任意属性
  }
  // 定义符合接口的对象：属性不能多也不能少，要恰恰好
  const a: Person = {
    name: "jack",
    age: 18,
    // sex: '男'
    hobby: ['唱', '跳']
  };


  interface Person1 {
    name: string;
    // 如果可选属性和任意属性表达意思一直（值的类型一样），那么就不能写
    // sex?: string; // error
    [propName: string]: string // 任意属性(可写可不写)
  }

  const b: Person1 = {
    name: 'jack',
    sex: '男', // 任意属性可以添加任意多个属性
    age: '18'
  }


  interface Person2 {
    readonly id: number; // 只读属性（必须写）
    name: string;
    age?: number;
  }

  let c: Person2 = {
    id: 1,
    name: 'jack'
  }

  c.name = 'bob'; // 默认属性都可以修改
  // c.id = 2; // error 只读属性不能修改

})();
