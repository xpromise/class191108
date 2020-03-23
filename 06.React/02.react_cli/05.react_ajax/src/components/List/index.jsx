import React, { Component } from "react";

export default class List extends Component {
  render() {
    return (
      <div className="row">
        <div className="card">
          <a href="https://github.com/aa" target="_blank">
            <img
              src="https://avatars1.githubusercontent.com/u/28438?v=4"
              // style样式中px单位可以省略不写
              style={{ width: 100 }}
            />
          </a>
          <p className="card-text">aa</p>
        </div>
      </div>
    );
  }
}
