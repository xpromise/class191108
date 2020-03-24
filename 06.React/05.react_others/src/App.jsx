import React, { Component, Fragment } from "react";

import Home from "./components/Home";
import About from "./components/About";
import ErrorBoundary from "./components/ErrorBoundary";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App...</h1>
        {/* 
          ErrorBoundary作为父组件，包裹着可能出错的子组件 
          当Home作为ErrorBoundary子组件
            父组件ErrorBoundary就会有一个props.children属性
            children的值就是子组件
        */}
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
      </Fragment>
    );
  }
}
