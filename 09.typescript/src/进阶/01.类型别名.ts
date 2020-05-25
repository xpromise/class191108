(() => {
  /*
    类型别名用来给一个类型起个新名字。
  */

  type Name = string;
  type Age = number;
  type Say = () => string;

  type RC = ReactLoginFormComponent;
  interface ReactLoginFormComponent {
    displayName: string
  }
  
  function fn(a: Name, b: Age, c: Say): void {
    console.log(a);
    console.log(b);
    console.log(c());
  }

  fn('111', 18, () => 'hello')

})();
