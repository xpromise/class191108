(() => {

  /*
    字符串字面量类型用来约束取值只能是某几个字符串中的一个。
  */

  type Mode = 'development' | 'production' | 'none';

  function fn(mode: Mode) {
    console.log(mode);
  }

  fn('development');


})()