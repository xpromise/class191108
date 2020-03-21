import React, { Component } from "react";

import Add from "./components/Add";
import List from "./components/List";

/*
  1. 拆分组件
    App
    List
    Add
    Item
  2. 实现静态组件  
    引入html结构：
      1. 将单标签加上结束符
      2. 将class改成className
      3. a标签一般用来跳转网址
          如果不要跳转网址，请使用button
      4. 将style改成 {{display: 'none'}}    
  3. 实现动态组件
    1. 要不要定义state？ 页面有变化，要
    2. state定义哪个组件？ 两个组件都要使用，定义在公共的父组件中App
    3. state定义成什么类型？
      comments: [
        { id: 1, name: '培华', comment: '我的13岁小女盆友呢？' }
      ]
    4. 实现state动态展示（将App组件的state交给Item组件进行展示~）
*/
class App extends Component {
  // 初始化状态
  state = {
    comments: [
      { id: 1, name: "培华", comment: "我的13岁小女盆友呢？" },
      { id: 2, name: "张天禹", comment: "头顶有点凉快~" }
    ]
  };

  // 初始化id
  id = 3;

  // 更新state的方法：添加评论
  add = (name, comment) => {
    const { comments } = this.state;

    this.setState({
      // 不要修改原数据
      comments: [
        { name, comment, id: this.id++ }, // 添加新的数据
        ...comments // 展开之前state
      ]
    });
  };

  render() {
    const { comments } = this.state;

    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Add add={this.add} />
          {/* 以props方式传递comments数据 */}
          <List comments={comments} />
        </div>
      </div>
    );
  }
}

export default App;
