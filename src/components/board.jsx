import React, { Component } from "react";
import Square from "./square.jsx";
import { King } from "./pieces.js";

class Board extends Component {
  renderSquare = (i, squareShade) => {
    return (
      <Square
        key={i}
        id={i}
        shade={squareShade}
        high={i === this.props.source ? 1 : 0}
        check={
          this.props.chessBoard[i] instanceof King &&
          this.props.chessBoard[i].player === this.props.underCheck
            ? 1
            : 0
        }
        style={this.props.chessBoard[i] ? this.props.chessBoard[i].style : null}
        handleClick={this.props.handleClick}
      />
    );
  };

  buildBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const sqaureRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          ((i ^ j) & 1) === 0 ? "square-white" : "square-black";
        // both i and j has to be even fro square to be white, hence XOR.
        sqaureRows.push(this.renderSquare(i * 8 + j, squareShade));
      }
      board.push(
        <div key={i} className="board-row">
          {sqaureRows}
        </div>
      );
    }
    return board;
  };
  render() {
    return <div className="board">{this.buildBoard()}</div>;
  }
}

export default Board;
