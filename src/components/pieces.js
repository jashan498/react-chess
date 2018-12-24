export class Piece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
  }
}

////////////////////////////////// King //////////////////////////////////
export class King extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
    );
  }

  isMovePossible(src, dest) {
    return (
      src - 9 === dest ||
      src - 8 === dest ||
      src - 7 === dest ||
      src + 1 === dest ||
      src + 9 === dest ||
      src + 8 === dest ||
      src + 7 === dest ||
      src - 1 === dest
    );
  }

  getPath(src, dest) {
    return [];
  }
}

////////////////////////////////// Queen //////////////////////////////////
export class Queen extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
    );
  }

  isMovePossible(src, dest) {
    let mod = src % 8;
    let diff = 8 - mod;

    return (
      Math.abs(src - dest) % 9 === 0 ||
      Math.abs(src - dest) % 7 === 0 ||
      (Math.abs(src - dest) % 8 === 0 ||
        (dest >= src - mod && dest < src + diff))
    );
  }

  getPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else if (Math.abs(src - dest) % 7 === 0) {
      incrementBy = 7;
      pathStart += 7;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}

////////////////////////////////// Bishop //////////////////////////////////
export class Bishop extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
    );
  }

  isMovePossible(src, dest) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0;
  }

  getPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else {
      incrementBy = 7;
      pathStart += 7;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}

////////////////////////////////// Knight //////////////////////////////////
export class Knight extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
    );
  }

  isMovePossible(src, dest) {
    return (
      src - 17 === dest ||
      src - 10 === dest ||
      src + 6 === dest ||
      src + 15 === dest ||
      src - 15 === dest ||
      src - 6 === dest ||
      src + 10 === dest ||
      src + 17 === dest
    );
  }

  getPath() {
    return [];
  }
}

////////////////////////////////// Rook //////////////////////////////////
export class Rook extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
    );
  }

  isMovePossible(src, dest) {
    let mod = src % 8;
    let diff = 8 - mod;
    return (
      Math.abs(src - dest) % 8 === 0 || (dest >= src - mod && dest < src + diff)
    );
  }

  getPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}

////////////////////////////////// Pawn //////////////////////////////////
export class Pawn extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
    );
  }

  initialPos = [
    [48, 49, 50, 51, 52, 53, 54, 55],
    [8, 9, 10, 11, 12, 13, 14, 15]
  ];

  isMovePossible(src, dest, isDestEnemyOccupied) {
    if (this.player === 1) {
      if (
        (dest === src - 8 && !isDestEnemyOccupied) ||
        (dest === src - 16 && this.initialPos[0].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        (dest === src - 9 || dest === src - 7)
      ) {
        return true;
      }
    } else if (this.player === 2) {
      if (
        (dest === src + 8 && !isDestEnemyOccupied) ||
        (dest === src + 16 && this.initialPos[1].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        (dest === src + 9 || dest === src + 7)
      ) {
        return true;
      }
    }
    return false;
  }

  getPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    } else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}
