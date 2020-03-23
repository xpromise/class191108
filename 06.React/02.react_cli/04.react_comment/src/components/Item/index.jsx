import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Item extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    del: PropTypes.func.isRequired
  };

  delComment = () => {
    // 获取当前的id
    const { comment, del } = this.props;
    const { id } = comment;
    // 调用父组件传递的删除方法
    del(id);
  };

  render() {
    const { name, comment } = this.props.comment;

    return (
      <li className="list-group-item">
        <div className="handle">
          <button onClick={this.delComment}>删除</button>
        </div>
        <p className="user">
          <span>{name}</span>
          <span>说:</span>
        </p>
        <p className="centence">{comment}</p>
      </li>
    );
  }
}
