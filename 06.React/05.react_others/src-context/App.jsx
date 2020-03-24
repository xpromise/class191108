import React, { Component, Fragment } from "react";

import Home from "./components/Home";
import myContext from "./context/my-context";
import yourContext from "./context/your-context";

export default class App extends Component {
  render() {
    const person = {
      name: "培华",
      age: 40
    };

    return (
      <Fragment>
        <h1>App...</h1>
        {/* 
          context上有两个组件：Provider Consumer
            Provider组件负责给后代组件提供数据（包裹后代组件）
            Consumer组件负责接受数据
        */}
        <yourContext.Provider value={123}>
          <myContext.Provider value={person}>
            <Home />
          </myContext.Provider>
        </yourContext.Provider>
      </Fragment>
    );
  }
}
