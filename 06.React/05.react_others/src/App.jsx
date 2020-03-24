import React, { useState, useEffect } from "react";

/*
  useState 能让纯函数组件使用state
    const [状态数据, 更新状态数据的方法] = useState(defaultValue)

  useEffect 能让纯函数组件使用生命周期函数  

*/

export default function App() {
  /*
    useState() 返回值是数组
      [count, setCount]对数组进行结构赋值
      count就是状态数据 默认值0
      setCount就是更新状态数据的方法，一旦调用就会重新渲染组件
        setCount(newState)
  */
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // 这个函数相当于 componentDidMount componentDidUpdate
  //   // 组件初始化渲染会触发，组件更新时也会触发
  //   console.log("111");
  // });

  useEffect(() => {
    /*
      需求：只想要起 componentDidMount 的作用（请求只发一次）, 不想要 componentDidUpdate 功能
      第二个参数是数组，里面可以放一些变量，监视变量的变化
        一旦变量发生变化，就会重新触发当前函数
        一旦没有变化，就不会触发了（而我传入空数组，没有要监视的变量，自然就永远不会触发第二次）
    */
    console.log("111");

    // return () => {
    //   // 相当于componentWillUpdate（初始化渲染不会触发，更新时才会触发）
    //   console.log(222);
    // };
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  // console.log("相当于render");

  return (
    <div>
      <p>点击 {count} 次</p>
      <button onClick={handleClick}>点我</button>
    </div>
  );
}
