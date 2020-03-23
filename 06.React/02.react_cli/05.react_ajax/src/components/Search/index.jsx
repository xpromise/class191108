import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" />
          <button>Search</button>
        </div>
      </section>
    );
  }
}
