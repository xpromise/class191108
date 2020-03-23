import React, { Component } from "react";
// impt
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    updateSearchName: PropTypes.func.isRequired
  }

  state = {
    searchName: ""
  };

  handleChange = e => {
    this.setState({
      searchName: e.target.value.trim()
    });
  };

  search = () => {
    const { searchName } = this.state;

    this.props.updateSearchName(searchName);
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="enter the name you search"
            onChange={this.handleChange}
          />
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
