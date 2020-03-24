import React, { Component } from "react";

import myContext from "../../context/my-context";
import yourContext from "../../context/your-context";

/*
  接受父组件context传递的数据，有两种方式
    1. context.Consumer   能接受多个context
    2. static contextType = context;  只能接受一个context
*/

export default class About extends Component {
  // 给About类添加属性，所以后添加会前面添加的
  // static contextType = myContext;
  // static contextType = yourContext;

  render() {
    // console.log(this.context);

    return (
      <div>
        About...
        {/* Consumer接受数据 */}
        <myContext.Consumer>
          {person => {
            console.log(person);
            // 返回要渲染的虚拟DOM
            return (
              <ul>
                <li>姓名：{person.name}</li>
                <li>年龄：{person.age}</li>
              </ul>
            );
          }}
        </myContext.Consumer>
        <yourContext.Consumer>
          {value => {
            console.log(value);
            // 返回要渲染的虚拟DOM
            return <p>{value}</p>;
          }}
        </yourContext.Consumer>
      </div>
    );
  }
}
