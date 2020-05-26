import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
// import "antd-mobile/dist/antd-mobile.css"; // 按需加载不需要引入样式

/*
  没有按需加载的打包体积大小
    132.63 KB  build\static\js\2.ecb42205.chunk.js
    18.14 KB   build\static\css\2.c34640d7.chunk.css
    777 B      build\static\js\runtime-main.87965cf4.js
    537 B      build\static\js\main.119e0452.chunk.js

  使用按需加载的打包体积大小
    56.72 KB  build\static\js\2.e90f429c.chunk.js
    2.51 KB   build\static\css\2.ce9da53a.chunk.css
    777 B     build\static\js\runtime-main.87965cf4.js
    556 B     build\static\js\main.f4a9c63d.chunk.js  
*/

import "./App.css";

export default class App extends Component {
  handleClick = () => {
    Toast.success("点我了~~~", 3);
  };

  render() {
    return (
      <div>
        <h1>App...</h1>
        <Button type="primary" onClick={this.handleClick}>
          按钮
        </Button>
        <div className="box"></div>
      </div>
    );
  }
}
