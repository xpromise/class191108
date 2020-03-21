import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Item extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  };

  render() {
    const { name, comment } = this.props.comment;

    return (
      <li className="list-group-item">
        <div className="handle">
          <button>删除</button>
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
