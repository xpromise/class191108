import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Detail from "../Detail";

export default class Messages extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/home/messages/1">Message001</Link>
          </li>
          <li>
            <Link to="/home/messages/3">Message003</Link>
          </li>
          <li>
            <Link to="/home/messages/5">Message005</Link>
          </li>
        </ul>
        {/* 
          只要组件是根据路径显示，就是用Route 
            如果一个组件对应一个路径 <Route path="/xxx" component={Xxx}> 
              一对一，一个组件对应一个路径
            如果一个组件对应多个路径 <Route path="/xxx/:id" component={Xxx}>
              一对多，一个组件对应多个路径

            path="/home/messages/:id"
              只要你是 /home/messages/xxx 开头就会匹配上
            path="/home/messsages/1"
              路径必须是/home/messages/1，才会匹配上
        */}
        <Route path="/home/messages/:id" component={Detail} />
      </div>
    );
  }
}
