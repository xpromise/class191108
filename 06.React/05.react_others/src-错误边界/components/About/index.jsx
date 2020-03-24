import React, { Component } from 'react'

export default class About extends Component {

  test = () => {}

  componentDidMount() {
    // 调用第二次会报错
    this.test()();
  }

  render() {
    return (
      <div>
        About...
      </div>
    )
  }
}
