import React, { Component } from "react";
import { Button, Carousel } from "antd";

// import "antd/dist/antd.css"; // 实现了按需加载就不需要样式
import "./App.css";

export default class App extends Component {
  handleClick = () => {
    console.log(111);
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>
          Primary
        </Button>{" "}
        <br />
        <br />
        <Button>Default</Button> <br />
        <br />
        <Button type="dashed">Dashed</Button> <br />
        <br />
        <Button type="link">Link</Button>
        <Carousel autoplay>
          <div className="box">111</div>
          <div className="box">222</div>
          <div className="box">333</div>
          <div className="box">444</div>
        </Carousel>
      </div>
    );
  }
}
