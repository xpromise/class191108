import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class B extends Component {
  constructor() {
    super();
    // 创建DOM元素
    this.div = document.createElement("div");
    // 添加body中
    document.body.appendChild(this.div);
  }

  componentWillUnmount() {
    // 组件将要卸载
    // 删除div元素
    document.body.removeChild(this.div);
  }

  render() {
    // 再把React内容(子元素，就是外面的p标签)渲染到div中
    return ReactDOM.createPortal(this.props.children, this.div);
  }
}
