import React, { Component } from "react";

import withForm from "../withForm";

class Register extends Component {
  render() {
    const { handleSubmit, handleChange } = this.props;
    return (
      <>
        <h1>注册</h1>
        <form onSubmit={handleSubmit}>
          用户名：
          <input type="text" onChange={handleChange("username")} /> <br />
          密码：
          <input type="password" onChange={handleChange("password")} />
          <br />
          确认密码：
          <input type="password" onChange={handleChange("rePassword")} />
          <br />
          <button type="submit">注册</button>
        </form>
      </>
    );
  }
}

export default withForm(Register);
