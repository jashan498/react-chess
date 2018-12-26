import React, { Component } from "react";

class Square extends Component {
  highlight = high => {
    if (high) return "highlight ";
    return "";
  };
  check = c => {
    if (c) return "check ";
    return "";
  };
  render() {
    return (
      <button
        className={
          this.check(this.props.check) +
          this.highlight(this.props.high) +
          "square " +
          this.props.shade
        }
        style={this.props.style}
        onClick={() => this.props.handleClick(this.props.id)}
      />
    );
  }
}

export default Square;
