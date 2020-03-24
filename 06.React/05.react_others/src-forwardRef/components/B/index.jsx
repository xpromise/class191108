import React from "react";

/*
  工厂函数组件没有生命周期函数，没有this，没有state
  只能通过参数接受props
*/
export default React.forwardRef(function B(props, ref) {
  /*
    props是父组件传递的属性
    ref就是父组件设置的ref
  */
  return <div ref={ref}>B....</div>;
});
