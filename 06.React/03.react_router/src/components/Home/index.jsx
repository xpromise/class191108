import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import News from "../News";
import Messages from "../Messages";

export default class Home extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li>
            <NavLink to="/home/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/home/messages">Messages</NavLink>
          </li>
        </ul>
        {/* Swtich 切换组件，只显示一个 */}
        <Switch>
          {/* 根据path加载相应的组件 */}
          <Route path="/home/news" component={News} />
          <Route path="/home/messages" component={Messages} />
          {/* 重定向，默认修改地址 */}
          <Redirect to="/home/news" />
        </Switch>
      </div>
    );
  }
}
