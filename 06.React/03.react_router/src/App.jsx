import React, { Component } from "react";

// 提取 BrowserRouter 重命名为 Router
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

/*
  react-router 前端路由
  1. 下载安装
    npm i react-router-dom 
  2. 使用
    - 将a标签改成Link组件  

    错误信息：Uncaught Error: Invariant failed: You should not use <Link> outside a <Router>
    解决: 所有路由要想使用生效，必须包裹在Router中

  3. 组件
    BrowserRouter 前端路由最外面的组件
    Link 充当a标签，不会刷新页面，不会发送请求，只会更新浏览历史记录
    NavLink 和Link功能相似，但是选中时多一个类 active
      如果标签选中时需要加上样式 用NavLink
      如果标签选中时不需要额外的样式 用Link
    Route 当匹配上指定路径，就会加载组件（没有匹配上，就会卸载组件）
    Redirect 重定向，重定向到新的地址
    Switch 切换显示，保证Switch内部组件只会加载一个显示（从上到下~）
*/

import Home from "./components/Home";
import About from "./components/About";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <NavLink className="list-group-item" to="/about">
                About
              </NavLink>
              <NavLink className="list-group-item" to="/home">
                Home
              </NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 命名规范：组件首字母大写  属性都是采用小驼峰命名法 */}
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/about" component={About} />
                  <Redirect to="/home" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
