import React, { Component } from "react";
import Square from "./square.jsx";
import initialiseChessBoard from "./initialiseChessBoard.js";

class Board extends Component {
  state = {
    chessBoard: initialiseChessBoard()
  };
  renderSquare = (i, squareShade) => {
    return (
      <Square
        shade={squareShade}
        style={this.state.chessBoard[i] ? this.state.chessBoard[i].style : null}
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
      board.push(<div className="board-row">{sqaureRows}</div>);
    }
    return board;
  };
  render() {
    return <div>{this.buildBoard()}</div>;
  }
}

export default Board;
