import React, { Component } from "react";

/*
  高阶组件：本质上是一个函数，接受一个组件作为参数，返回值是一个新组件(在新组件内部复用代码)
  作用：用来复用多个组件公共代码
*/
export default function withForm(WrappedComponent) {
  return class extends Component {
    // static displayName 给组件命名，优先级最高
    static displayName = `Form(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    state = {
      // username: "",
      // password: "",
      // rePassword: ""
    };

    // 高阶函数
    handleChange = key => {
      return e => {
        this.setState({
          [key]: e.target.value
        });
      };
    };

    handleSubmit = e => {
      e.preventDefault();
      console.log(this.state);
    };

    render() {
      // 保存更新方法（方法）
      const mapDispatchToProps = {
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit
      };
      // 以props方式传递给 WrappedComponent 组件
      return <WrappedComponent {...this.state} {...mapDispatchToProps} />;
    }
  };
}
