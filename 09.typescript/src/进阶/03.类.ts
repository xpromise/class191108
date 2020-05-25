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
  console.log(p.name, p.age);
  console.log(p.sayHello());
})();
