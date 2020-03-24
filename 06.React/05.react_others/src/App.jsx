import React, { Component, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";

// import Home from "./components/Home";
// import About from "./components/About";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* 
          lazy 和 Suspense 必须配合使用
          Suspense组件必须包裹lazy（lazy必须使用在Suspense内部）

          默认情况下所有代码会被打包到一个js文件中。首页加载速度很慢
          通过代码分割，将所有路由组件分割成单独的js文件
            比如一上来显示的home，就只会加载home组件相关的内容，其他组件不会加载。
            所以加载速度就会快很多~
        */}
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
