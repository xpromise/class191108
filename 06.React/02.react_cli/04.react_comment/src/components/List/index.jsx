import React, { Component } from "react";
import PropTypes from "prop-types"; // 下载 react/react-dom 时已经自带了依赖

import Item from "../Item";

export default class List extends Component {
  // 对属性进行类型和必要性限制
  static propTypes = {
    comments: PropTypes.array.isRequired,
    del: PropTypes.func.isRequired
  };

  render() {
    const { comments, del } = this.props;

    const display = comments.length ? "none" : "block";
    /*
      写样式：className / style
        如果样式会有变化并要通过js来控制，就用style。方便随时更新
        如果样式是写死的，不会发生变化，一般用className
    */

    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {comments.map(comment => {
            // 遍历的每一项都要有唯一的key属性
            return <Item key={comment.id} comment={comment} del={del} />;
          })}
        </ul>
      </div>
    );
  }
}
