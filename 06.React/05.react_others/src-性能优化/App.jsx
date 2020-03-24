import React, { Component, Fragment } from "react";

import A from "./components/A";
import B from "./components/B";
import C from "./components/C";

export default class App extends Component {
  state = {
    a: false,
    b: false,
    c: false
  };

  update = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { a, b, c } = this.state;

    return (
      <Fragment>
        <h1>App...</h1>
        <A update={this.update} a={a} />
        <B update={this.update} b={b} />
        <C update={this.update} c={c} />
      </Fragment>
    );
  }
}
