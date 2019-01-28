import React, { Component } from "react";

class StartPage extends Component {
  state = {
    userName: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onclick(this.state.userName);
  };

  render() {
    return (
      <React.Fragment>
        <form className="form" onSubmit={this.onSubmit}>
          <h2 className="starth2">Join/Create Game</h2>
          <p>
            <input
              placeholder="Share this with your friend to play..."
              className="startInput"
              onChange={e => this.setState({ userName: e.target.value })}
            />
          </p>
          <button
            type="submit"
            className="startButton"
            // onClick={() => this.props.onclick(this.state.userName)}
          >
            Enter Game
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default StartPage;
