import React, { Component } from "react";
import Navbar from "./navbar.jsx";
import Board from "./board.jsx";
import Modal from "./modal.jsx";
import initialiseChessBoard from "./initialiseChessBoard.js";
import { Pawn, King, Queen } from "./pieces.js";
import StartPage from "./startPage";
import LoadingScreen from "./loading";
import { ToastContainer, toast } from "react-toastify";

import io from "socket.io-client";
let socket = io(`https://salty-refuge-59199.herokuapp.com`);
// let socket = io(`http://localhost:8080`);

class Game extends Component {
  state = {
    chessBoard: initialiseChessBoard(),
    player: null,
    source: -1,
    kings: [60, 4], // Initial King positions
    underCheck: -1,
    turn: 1,
    winner: null,
    show: false,
    joinedRoom: false,
    showLoading: false
  };

  ///////////// SOCKET WORK //////////////

  componentWillMount() {
    socket.on("roomJoined", data => {
      this.setState({ player: data });
    });

    socket.on("stopLoading", () => {
      this.setState({ showLoading: false });
    });

    socket.on("stateChanged", data => {
      this.handleEmitClick(data);
    });

    socket.on("loser", loser => {
      if (!this.state.winner)
        this.setState({ winner: loser === 1 ? "Black" : "White", show: true });
    });

    socket.on("roomFull", data => {
      this.setState({ joinedRoom: false });
      toast(data);
    });

    socket.on("rematch", () => {
      const {
        chessBoard,
        player,
        source,
        kings,
        underCheck,
        turn,
        winner,
        show
      } = {
        chessBoard: initialiseChessBoard(),
        player: this.state.player,
        source: -1,
        kings: [60, 4], // Initial King positions
        underCheck: -1,
        turn: 1,
        winner: null,
        show: false
      };
      this.setState({
        chessBoard,
        player,
        source,
        kings,
        underCheck,
        turn,
        winner,
        show
      });
    });

    socket.on("oppDisconnected", () => {
      // console.log("do you know");
      toast("Other player already left the game");
      this.setState({ joinedRoom: false });
    });
  }

  ///////////////////////////////////////////////

  enterGame = userName => {
    if (userName.length === 0) {
      toast.error("Name should have atleast one character");
    } else {
      socket.emit("joinRoom", userName.toLowerCase());
      this.setState({ joinedRoom: true, showLoading: true });
      console.log(userName);
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  handleCross = () => {
    this.setState({ show: false });
  };

  rematch = () => {
    const {
      chessBoard,
      player,
      source,
      kings,
      underCheck,
      turn,
      winner,
      show
    } = {
      chessBoard: initialiseChessBoard(),
      player: this.state.player,
      source: -1,
      kings: [60, 4], // Initial King positions
      underCheck: -1,
      turn: 1,
      winner: null,
      show: false
    };
    this.setState({
      chessBoard,
      player,
      source,
      kings,
      underCheck,
      turn,
      winner,
      show
    });
    socket.emit("rematch");
  };

  handleEmitClick = data => {
    const { source, dest, underCheck, turn, kings } = data;
    console.log(turn);
    let chessBoard = this.state.chessBoard;
    chessBoard[dest] = chessBoard[source];
    chessBoard[source] = null;
    this.setState({ chessBoard, underCheck, turn, kings });
  };

  handleClick = i => {
    if (this.state.player !== this.state.turn) return;

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
      // console.log("yoolloo", source, chessBoard[source]);
      let isMovePossible = sourSquare.isMovePossible(source, i);
      let canTrans = false;
      if (sourSquare instanceof Pawn) {
        const isDestOcc = destSquare;
        isMovePossible = sourSquare.isMovePossible(source, i, isDestOcc);

        // Also see if Pawn has reached opponent's side
        if (sourSquare.player === 1 && i >= 0 && i <= 7) canTrans = true;
        else if (sourSquare.player === 2 && i >= 56 && i <= 63) canTrans = true;
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

          // Transform the Pawn into Queen if it reaches opponent's side
          if (canTrans) chessBoard[i] = new Queen(sourSquare.player);

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

          const emitSource = source;
          const under = undercheck;
          source = -1;
          this.setState(
            {
              chessBoard: chessBoard,
              source: source,
              kings: kings,
              turn: opp,
              underCheck: undercheck
            },
            () => {
              socket.emit("stateChanged", {
                source: emitSource,
                dest: i,
                underCheck: under,
                turn: opp,
                kings: kings
              });
            }
          );
        } else {
          this.setState({ source: -1 }, () => {
            socket.emit("stateChanged", i);
          });
        }
      } else {
        this.setState({ source: -1 }, () => {
          socket.emit("stateChanged", i);
        });
      }
    }
  };

  checkKing = (chessBoard, sourSquare, oppKing) => {
    let ans = false;
    for (let i = 0; i < 64; i++) {
      if (
        chessBoard[i] !== null &&
        chessBoard[i].player === sourSquare &&
        (chessBoard[i].isMovePossible(i, oppKing) ||
          chessBoard[i] instanceof Pawn)
      ) {
        if (chessBoard[i] instanceof Pawn) {
          if (
            oppKing === i + 9 ||
            oppKing === i + 7 ||
            oppKing === i - 9 ||
            oppKing === i - 7
          ) {
            ans = chessBoard[i].isMovePossible(i, oppKing, chessBoard[oppKing]);
          }
        } else {
          const path = chessBoard[i].getPath(i, oppKing);
          if (path.every(s => chessBoard[s] === null)) {
            // console.log("@@@@@@ ", chessBoard[i]);
            ans = true;
            break;
          }
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

  renderTurn = () => {
    if (this.state.turn === 1) {
      return (
        <React.Fragment>
          <span className="white-dot turn" />
          &nbsp;
          <span className="black-dot" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span className="white-dot" />
        &nbsp;
        <span className="black-dot turn" />
      </React.Fragment>
    );
  };

  render() {
    if (!this.state.joinedRoom) {
      return (
        <React.Fragment>
          <Navbar />
          <ToastContainer />
          <StartPage onclick={this.enterGame} />
        </React.Fragment>
      );
    }

    if (this.state.showLoading) {
      return (
        <React.Fragment>
          <Navbar />
          <LoadingScreen show={this.state.showLoading} />
        </React.Fragment>
      );
    }

    return (
      <div>
        <Navbar />
        <Modal
          show={this.state.show}
          handleClose={this.rematch}
          handleCross={this.handleCross}
          winner={this.state.winner}
        />

        <nav className="navbar navbarUnder">
          <span className="scoreTurn">
            <h3>Turn: </h3>
          </span>
          <span className="turnBoard">{this.renderTurn()}</span>
          <span>
            <span className="badge badge-pill badge-outline lb-lg">0</span>
            <span> - </span>
            <span className="badge badge-pill badge-outline-dark  lb-lg">
              0
            </span>
          </span>
        </nav>
        <Board
          chessBoard={this.state.chessBoard}
          source={this.state.source}
          underCheck={this.state.underCheck}
          handleClick={this.handleClick}
          player={this.state.player}
        />
      </div>
    );
  }
}

export default Game;
