import React, { Component } from "react";

class Square extends Component {
  render() {
    return <button className={"square " + this.props.shade} />;
  }
}

export default Square;
