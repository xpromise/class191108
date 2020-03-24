import React, { Component, Fragment } from "react";

import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App...</h1>
        <Login />
        <Register />
      </Fragment>
    );
  }
}
