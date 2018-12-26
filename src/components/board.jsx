import React, { Component } from "react";
import Square from "./square.jsx";
import initialiseChessBoard from "./initialiseChessBoard.js";
import { Pawn, King } from "./pieces.js";

class Board extends Component {
  state = {
    chessBoard: initialiseChessBoard(),
    player: 1,
    source: -1,
    kings: [60, 4], // Initial King positions
    underCheck: -1
  };
  renderSquare = (i, squareShade) => {
    return (
      <Square
        id={i}
        shade={squareShade}
        high={i === this.state.source ? 1 : 0}
        check={
          this.state.chessBoard[i] instanceof King &&
          this.state.chessBoard[i].player === this.state.underCheck
            ? 1
            : 0
        }
        style={this.state.chessBoard[i] ? this.state.chessBoard[i].style : null}
        handleClick={this.handleClick}
      />
    );
  };
  handleClick = i => {
    // If its the first click
    if (this.state.source === -1) {
      const square = this.state.chessBoard[i];
      // see if there is a piece on that square
      if (square) {
        // Player can move only his piece
        if (this.state.player !== square.player) return;

        this.setState({ source: i });
      }
    } else {
      // Its the second click, that is destination
      let chessBoard = this.state.chessBoard;
      let source = this.state.source;
      const sourSquare = chessBoard[source];
      const destSquare = chessBoard[i];
      let isMovePossible = sourSquare.isMovePossible(source, i);
      if (sourSquare instanceof Pawn) {
        const isDestOcc = destSquare;
        isMovePossible = sourSquare.isMovePossible(source, i, isDestOcc);
      }
      if (isMovePossible) {
        const pathArray = sourSquare.getPath(source, i);
        // console.log(sourSquare instanceof Pawn, pathArray);
        if (
          pathArray.every(s => chessBoard[s] === null) &&
          (!destSquare || destSquare.player !== sourSquare.player)
        ) {
          let kings = [...this.state.kings];
          if (sourSquare instanceof King) {
            kings[sourSquare.player === 1 ? 0 : 1] = i;
          }
          let undercheck = this.state.underCheck;
          const opp = sourSquare.player === 1 ? 2 : 1;
          chessBoard[i] = chessBoard[source];
          chessBoard[source] = null;
          // See if new config checks the opponent's king
          console.log("#####player ", undercheck);
          // const opp = sourSquare.player === 1 ? 2 : 1;
          if (this.checkKing(chessBoard, this.state.player, kings[opp - 1]))
            undercheck = opp;
          else undercheck = -1;
          // If the player was under check and this move removes that check.
          if (undercheck === this.state.player) {
            if (!this.checkKing(chessBoard, opp, kings[this.state.player - 1]))
              undercheck = -1;
          }
          // see if player piece is under check due to its own piece
          if (this.checkKing(chessBoard, opp, kings[this.state.player - 1]))
            undercheck = this.state.player;
          console.log("player ", undercheck);
          // console.log(sourSquare.getSrcToDestPath(source, i));
          // console.log(this.checkKing(pathArray, this.state.player));
          source = -1;
          const player = this.state.player === 1 ? 2 : 1;
          this.setState({
            chessBoard: chessBoard,
            player: player,
            source: source,
            kings: kings,
            underCheck: undercheck
          });
        } else {
          this.setState({ source: -1 });
        }
      } else {
        this.setState({ source: -1 });
      }
    }
  };

  checkKing = (chessBoard, sourSquare, oppKing) => {
    let ans = false;
    for (let i = 0; i < 64; i++) {
      if (
        chessBoard[i] !== null &&
        chessBoard[i].player === sourSquare &&
        chessBoard[i].isMovePossible(i, oppKing)
      ) {
        const path = chessBoard[i].getPath(i, oppKing);
        if (path.every(s => chessBoard[s] === null)) {
          // console.log("@@@@@@ ", chessBoard[i]);
          ans = true;
          break;
        }
      }
    }
    return ans;
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
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1 style={{ color: "white" }}>React Chess</h1>
            </div>
          </div>
        </nav>
        <div className="board">{this.buildBoard()}</div>
      </div>
    );
  }
}

export default Board;
