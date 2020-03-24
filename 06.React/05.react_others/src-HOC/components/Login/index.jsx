import React, { Component } from "react";
import withForm from "../withForm";

class Login extends Component {
  render() {
    // 提取高阶组件传递的props
    const { handleSubmit, handleChange } = this.props;
    return (
      <>
        <h1>登录</h1>
        <form onSubmit={handleSubmit}>
          用户名：
          <input type="text" onChange={handleChange("username")} /> <br />
          密码：
          <input type="password" onChange={handleChange("password")} />
          <br />
          <button type="submit">登录</button>
        </form>
      </>
    );
  }
}
/*
  使用 withForm 高阶组件包装了 Login 组件
    withForm内部就会给 Login组件传递 属性和方法
    并返回一个接受到属性和方法的新组件   
*/
const NewComp = withForm(Login);

export default NewComp;

/* export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  // 高阶函数
  handleChange = key => {
    return e => {
      this.setState({
        [key]: e.target.value
      });
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <h1>登录</h1>
        <form onSubmit={this.handleSubmit}>
          用户名：
          <input type="text" onChange={this.handleChange("username")} /> <br />
          密码：
          <input type="password" onChange={this.handleChange("password")} />
          <br />
          <button type="submit">登录</button>
        </form>
      </>
    );
  }
}
 */
