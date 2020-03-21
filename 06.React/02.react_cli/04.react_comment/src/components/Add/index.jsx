import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Add extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired
  };

  state = {
    name: "",
    comment: ""
  };

  // 闭包典型应用：就是高阶函数
  handleChange = key => {
    return e => {
      this.setState({
        [key]: e.target.value.trim()
      });
    };
  };

  addComment = () => {
    // 收集表单数据
    const { name, comment } = this.state;

    if (!name) {
      alert("请输入用户名~");
      return;
    }

    if (!comment) {
      alert("请输入评论内容~");
      return;
    }

    // 添加评论
    this.props.add(name, comment);

    // 清空表单数据
    this.setState({
      name: "",
      comment: ""
    });
  };

  render() {
    const { name, comment } = this.state;

    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              onChange={this.handleChange("name")}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              onChange={this.handleChange("comment")}
              value={comment}
            />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="button"
                onClick={this.addComment}
                className="btn btn-default pull-right"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
