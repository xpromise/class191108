import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  // 只要定义了这两个生命周期函数，就是错误边界组件
  static getDerivedStateFromError(error) {
    // 一旦触发了这个生命周期函数，就说明子组件出错了~
    // 返回值会更新ErrorBoundary当前组件状态
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    // 将错误收集发送给后台进行统计
    // 一般要把错误收集，发送请求到后台去
    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      // 一旦子组件出问题。渲染备用DOM树
      // 备用DOM树
      return <h1>页面奔溃了，请联系管理员</h1>;
    }

    // 如果子组件没有问题，就直接渲染
    // 返回（渲染）子组件
    return this.props.children;
  }
}
