import React, { Component } from "react";

export default class App extends Component {
  handleClick() {
    function fn() {};
    fn()();
  }

  render() {
    return (
      <div>
        <h1>hello App</h1>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    );
  }
}
