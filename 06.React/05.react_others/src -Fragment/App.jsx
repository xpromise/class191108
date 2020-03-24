import React, { Component, Fragment } from "react";

export default class App extends Component {
  render() {
    return (
      // 用来充当根标签，特点不会生成额外的DOM元素
      <Fragment>
        <h1>标题~~~</h1>
        <p>文本内容~~~</p>
        {/* 相当于 Fragment 用法，注意不需要引入 Fragment */}
        <>
          <span>span1~~~</span>
          <span>span2~~~</span>
        </>
      </Fragment>
    );
  }
}
