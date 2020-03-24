import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

/*
  PureComponent内部实现了类似于shouldComponentUpdate
    里面会对props和state进行浅比较（只会对比第一层属性），
      如果都相等，就不更新
      只要有一个不相等，就更新
    
    这也是为什么要求更新的数据必须是新数据，而不能修改原数据
      因为只对比一层数据，所以如果修改原数据，对比结果地址值一样，不更新（实际要更新）
      更新产生一份新数据，对比地址值就不一样，就会更新  
*/
export default class A extends PureComponent {
  static propTypes = {
    update: PropTypes.func.isRequired,
    a: PropTypes.bool.isRequired
  };

  handleClick = () => {
    this.props.update("a", !this.props.a);
  };

  render() {
    console.log("A  render");

    return (
      <div>
        A....
        {this.props.a ? "a的值为true" : "a的值为false"}
        <button onClick={this.handleClick}>A组件按钮</button>
      </div>
    );
  }
}
