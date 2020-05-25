(() => {
  interface Animals {
    eat(): void;
  }

  // 1. 类实现（implements）接口
  // 目的: 抽取类的公共方法在接口定义，然后通过类实现接口来复用
  class Cat implements Animals {
    eat() {
      console.log("cat eat");
    }
  }

  class Dog implements Animals {
    eat() {
      console.log("dog eat");
    }
  }

  interface Person {
    say(): void;
  }
  // 类能实现多个接口
  class Bird implements Person, Animals {
    eat() {}
    say() {}
  }

  // 子类能继承多个父类吗？类只能继承一个类
  // class A extends Cat, Dog {}  // error

  // 2. 接口继承接口
  interface Fish extends Animals {
    // eat(): void; // 问题，有一个接口已经实现了 eat，代码就没有复用
    swim(): void;
  }

  class A implements Fish {
    eat() {}
    swim() {}
  }

  // 3. 接口继承类
  class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  interface Point3d extends Point {
    z: number;
  }

  let point3d: Point3d = { z: 3, x: 1, y: 2 };
})();
