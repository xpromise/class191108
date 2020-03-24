import React, { Component, Fragment } from "react";

import A from "./components/A";
import B from "./components/B";

export default class App extends Component {
  h1Ref = React.createRef();
  aRef = React.createRef();
  bRef = React.createRef();

  componentDidMount() {
    console.log(this.h1Ref);
    console.log(this.aRef);
    console.log(this.bRef);
  }

  render() {
    /*
      ref 如果设置过普通虚拟DOM对象，获取到就是真实DOM元素
          如果设置是组件
            ES6类组件 -- 组件实例对象
            工厂函数组件 -- null（默认获取不到）
              React.forwardRef() 可以获取工厂函数组件里面的内容
      
      ref也可以用于组件间通信：父组件直接获取子组件数据      
    */
    return (
      <Fragment>
        <h1 ref={this.h1Ref}>App...</h1>
        <A ref={this.aRef} />
        <B ref={this.bRef} />
      </Fragment>
    );
  }
}
