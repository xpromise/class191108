import React, { Component } from "react";

/*
  凡是通过Route加载的组件，就是路由组件
  路由组件具有三大属性：
    location 用来获取路由路径和传递的参数
      pathname 路由路径
      state 传递参数
    history 用来控制浏览器历史记录（前进、后退、添加、替换等）
    match 获取params参数
*/
export default class Detail extends Component {
  state = {
    messages: [
      { id: 1, content: "message detail 111" },
      { id: 3, content: "message detail 333" },
      { id: 5, content: "message detail 555" }
    ]
  };

  render() {
    const { messages } = this.state;
    // 获取params参数
    const { id } = this.props.match.params;

    // filter会遍历整个数组
    // messages.filter()
    // find找到了就不会再找了，性能更好
    /*
      当内部返回值为true时，找到了，后面就不看了，并将当前这个item返回
      当内部返回值为false时，会接着找，直到全部遍历完都没有找到。返回undefined
    */
    // console.log(id);
    const { content } = messages.find(message => message.id === +id);

    return <div>{content}</div>;
  }
}
