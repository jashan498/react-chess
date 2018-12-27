import React, { Component } from "react";

class Modal extends Component {
  render() {
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <h1 className="mtext">{this.props.winner} wins!</h1>
          <button
            className="btn btn-primary mbutton"
            onClick={this.props.handleClose}
          >
            Rematch
          </button>
        </section>
      </div>
    );
  }
}
export default Modal;
