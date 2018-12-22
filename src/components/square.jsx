import React, { Component } from "react";

class Square extends Component {
  render() {
    return (
      <button
        className={"square " + this.props.shade}
        style={this.props.style}
      />
    );
  }
}

export default Square;
