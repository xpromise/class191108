(() => {
  /*
    class 定义类
    extends 继承类
    static 定义类的属性/方法
    contructor 类的构造方法
    super
      super() 调用父类的contructor方法
      super.xxx() 调用父类的其他方法 (也可以通过this访问)
      但是不能父类的属性。父类的属性通过 this.xxx 读取
    abstract 定义抽象类

    readonly 只读

    public 所有类都可以访问属性/方法
    protected 
      除了自己可以访问属性/方法，
      继承的子类也可以访问属性/方法
      但是实例对象不能访问
    private 只有自己可以访问
  */
  class Person {
    // public代表公开的，都可以访问
    // protected name: string; // 定义类有name属性，值为string类型
    // private代表私有的，只有自己（类Person）可以访问，实例对象不可以访问
    // private age: number = 18; // 定义类有age属性，为number类型, 值为18
    protected age: number = 18; // 定义类有age属性，为number类型, 值为18

    constructor(protected readonly name: string) {
      // 如果将contructor调为private，就不允许被继承
      // 代表将来new Person()传入的参数是string
      this.name = name;
    }

    protected sayHello() {
      return `我的名字是：${this.name}, 我的年龄为: ${this.age}`;
    }
  }

  // private代表私有的，子类也不可以访问
  class Son extends Person {
    constructor(name: string) {
      super(name); // 调用父类的contructor方法
      // super只能使用方法
      // console.log(super.name); // error
      // 访问属性，通过this访问
      console.log(this.name);
      console.log(this.sayHello);
      // this.name = 'jack'; // error readonly
      // console.log(super.age);
      // console.log(super.sayHello);
    }
  }

  const p = new Person("jack");
  // console.log(p.name, p.age);
  // console.log(p.sayHello());

  /*
  什么是抽象类？
    1. 抽象类是不允许被实例化的
    2. 抽象类中的抽象方法必须被子类实现
  */

  // 定义抽象类
  abstract class Door {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    // 定义抽象方法(没有实现)
    public abstract say(): void;
    // 定义方法
    open() {
      console.log("open");
    }
  }

  // 1. 抽象类是不允许被实例化的
  // const d = new Door();
  // 2. 抽象类中的抽象方法必须被子类实现
  class ADoor extends Door {
    constructor(name: string) {
      super(name);
      this.name; // 通过this访问属性
      super.open(); // 通过super访问方法
      this.open(); // 也库通过this访问方法
    }
    say() {
      console.log("say()");
    }
  }
})();
