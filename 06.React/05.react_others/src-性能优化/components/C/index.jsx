import React from "react";

function C(props) {
  /*
    工厂函数组件没有this
    通过参数props接受父组件传递的属性
  */
  console.log("C  render");

  const handleClick = () => {
    props.update("c", !props.c);
  };

  return (
    <div>
      C....
      {props.c ? "c的值为true" : "c的值为false"}
      <button onClick={handleClick}>C组件按钮</button>
    </div>
  );
}

// 相等于shouldComponentUpdate
// 不同的是：返回值true是不更新 返回值false是更新
function eq(prevProps, nextProps) {
  const keys = Object.keys(nextProps);

  for (let index = 0; index < keys.length; index++) {
    // 获取单个属性
    const key = keys[index];
    // hasOwnProperty 判断是否自身上的属性（直接属性，不是原型上的属性）

    // 判断this.props上是否有nextProps上的属性, 如果没有就更新
    // 判断属性值是否相等，如果不相等就更新
    if (!prevProps.hasOwnProperty(key) || prevProps[key] !== nextProps[key]) {
      // 只要有一个不相等就更新
      return false;
    }
  }
  // 全相等就不更新
  return true;
}

export default React.memo(C, eq);
