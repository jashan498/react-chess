import React, { Component } from "react";

class LoadingScreen extends Component {
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
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div className="loader-text">waiting for other player to join</div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoadingScreen;
