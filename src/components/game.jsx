import React, { Component } from "react";
import Navbar from "./navbar.jsx";
import Board from "./board.jsx";
import Modal from "./modal.jsx";
import initialiseChessBoard from "./initialiseChessBoard.js";
import { Pawn, King } from "./pieces.js";

class Game extends Component {
  state = {
    chessBoard: initialiseChessBoard(),
    player: 1,
    source: -1,
    kings: [60, 4], // Initial King positions
    underCheck: -1,
    winner: null,
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  handleCross = () => {
    this.setState({ show: false });
  };

  hideModal = () => {
    const { chessBoard, player, source, kings, underCheck, winner, show } = {
      chessBoard: initialiseChessBoard(),
      player: 1,
      source: -1,
      kings: [60, 4], // Initial King positions
      underCheck: -1,
      winner: null,
      show: false
    };
    this.setState({
      chessBoard,
      player,
      source,
      kings,
      underCheck,
      winner,
      show
    });
  };

  handleClick = i => {
    // If its the first click
    if (this.state.winner) return;
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

  componentDidUpdate() {
    const kings = this.state.chessBoard.filter(c => c instanceof King);
    if (!this.state.winner && kings.length === 1) {
      this.setState({
        show: true,
        winner: 1 === kings[0].player ? "White" : "Black"
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          handleCross={this.handleCross}
          winner={this.state.winner}
        />
        <Board
          chessBoard={this.state.chessBoard}
          source={this.state.source}
          underCheck={this.state.underCheck}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Game;
