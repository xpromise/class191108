import React, { Component } from "react";
import PropTypes from "prop-types";

export default class B extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    b: PropTypes.bool.isRequired
  };

  handleClick = () => {
    this.props.update("b", !this.props.b);
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 性能优化：减少不必要的重新渲染
    // console.log(nextProps, nextState); // 新的
    // console.log(this.props, this.state); // 旧的（上一次）
    /*
      判断上一次的props和当前最新的props是否相等
      判断上一次的state和当前最新的state是否相等

      只要有一个不一样，说明有新内容要更新，就更新
      只有全部相等，说明没有新内容，就不更新
    */

    // 提取对象所有属性
    const keys = Object.keys(nextProps);

    for (let index = 0; index < keys.length; index++) {
      // 获取单个属性
      const key = keys[index];
      // hasOwnProperty 判断是否自身上的属性（直接属性，不是原型上的属性）
      // Object.prototype.hasOwnProperty.call(this.props, key)

      // 判断this.props上是否有nextProps上的属性, 如果没有就更新
      // 判断属性值是否相等，如果不相等就更新
      if (
        !this.props.hasOwnProperty(key) ||
        this.props[key] !== nextProps[key]
      ) {
        // 只要有一个不相等就更新
        return true;
      }
    }
    // 全相等就不更新
    return false;
  }

  render() {
    console.log("B  render");

    return (
      <div>
        B....
        {this.props.b ? "b的值为true" : "b的值为false"}
        <button onClick={this.handleClick}>B组件按钮</button>
      </div>
    );
  }
}
