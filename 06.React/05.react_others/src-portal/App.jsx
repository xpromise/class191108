import React, { Component, Fragment } from "react";

import A from "./components/A";
import B from "./components/B";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App...</h1>
        <A />
        {/* 
          B组件里面包裹p标签
            说明p标签就是B组件的子组件（内容）
            B组件内部就能通过this.props.children获取p标签
        */}
        <B>
          <p>hello portals</p>
        </B>
      </Fragment>
    );
  }
}
