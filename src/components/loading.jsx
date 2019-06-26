import React, { Component } from "react";

class LoadingScreen extends Component {
  lowerText = () => {
    return "Code to join this Game: ";
  };
  render() {
    if (!this.props.show) return null;
    return (
      <React.Fragment>
        <div className="wrap-loader">
          <div className="loader">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="wrap-text">
              <div className="text">
                <span>W</span>
                <span>A</span>
                <span>I</span>
                <span>T</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div className="loader-text">Waiting for other Player</div>
          <div className="loader-text">
            <span>
              {this.lowerText()}{" "}
              <p style={{ fontWeight: "bold", display: "inline" }}>
                {this.props.roomName}
              </p>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoadingScreen;
