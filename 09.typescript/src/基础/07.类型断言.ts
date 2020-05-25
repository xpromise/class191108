(() => {
  interface Person {
    name: string;
  }
  interface Animals {
    age: number;
  }
  // 将一个联合类型断言为其中一个类型
  function fn(x: Person | Animals): void {
    // 类型断言
    if ((x as Person).name) { // ---> x.name
      // 不能直接使用
      console.log((x as Person).name);
      // return x.name; //error
    } else if ((x as Animals).age) { // --> x.age
      console.log((x as Animals).age);
    }
  }

  fn({ name: "jack" });
  fn({ age: 18 });

  // 将一个父类断言为更加具体的子类
  // 父类
  class Father{}; 
  // 子类
  class Son extends Father {
    name: string; // 对Son类的属性进行类型声明
    constructor(name: string) {
      super();
      this.name = name;
    }
  }
  // 子类
  class Doc extends Father {
    age: number; 
    constructor(age: number) {
      super();
      this.age = age;
    }
  }

  function foo(x: Father) {
    if ((x as Son).name) {
      console.log((x as Son).name);
    } else if ((x as Doc).age) {
      console.log((x as Doc).age);
    }
  }


})();
