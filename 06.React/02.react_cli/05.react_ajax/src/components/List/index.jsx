import React, { Component } from "react";
import axios from "axios";
import PubSub from "pubsub-js";

/*
  接口文档：https://developer.github.com/v3/search/#search-users
  接口url：https://api.github.com/search/users?q=xpro
*/

export default class List extends Component {
  state = {
    isFirstView: true, // 是否是初始化渲染
    isLoading: false, // 是否是请求中
    users: [], // 请求成功的数据
    error: "" // 请求失败的错误
  };

  componentDidMount() {
    // 订阅消息(只能订阅一次)
    // 接受数据的是订阅，发布数据是发布
    // state定义在哪？哪个组件需要数据进行展示，就定义在哪
    PubSub.subscribe("SEARCH_NAME", (msg, searchName) => {
      // 一旦发布消息，就会触发订阅消息的回调函数
      // 发送请求之前，切换成loading
      this.setState({
        isFirstView: false,
        isLoading: true
      });
      // 发送请求
      axios({
        method: "GET",
        url: "https://api.github.com/search/users",
        params: {
          q: searchName
        }
      })
        .then(response => {
          // 请求成功
          this.setState({
            users: response.data.items.map(user => {
              return {
                name: user.login, // 名字
                avatar: user.avatar_url.replace(/s[0-9]/g, "s"), // 头像
                url: user.html_url, // 仓库地址
                id: user.id
              };
            }),
            isLoading: false
          });
        })
        .catch(error => {
          // 请求失败
          this.setState({
            error: "网络出现故障",
            users: [],
            isLoading: false
          });
        });
    });
  }

  render() {
    const { isFirstView, isLoading, users, error } = this.state;

    if (isFirstView) {
      return <h1>Enter Name To Search</h1>;
    }

    if (isLoading) {
      return <h1>Loading....</h1>;
    }

    if (users.length) {
      return (
        <div className="row">
          {users.map(user => {
            return (
              <div className="card" key={user.id}>
                <a href={user.url} target="_blank">
                  <img
                    src={user.avatar}
                    // style样式中px单位可以省略不写
                    style={{ width: 100 }}
                  />
                </a>
                <p className="card-text">{user.name}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return <h1>{error}</h1>;
  }
}
