// 因为JSX语法最终会被babel编译成js语法（React.createElement）
// 此时编译后就会去找React，如果不引入就会报错
import React, { Component } from "react";
// import React  from "react";
// import { Component } from "react";

// 样式哪里用哪里引入
import "./App.css";

class App extends Component {
  render() {
    return (
      <h1 className="title" style={{ fontSize: 50 }}>
        hello react cli
      </h1>
    );
  }
}

export default App;
