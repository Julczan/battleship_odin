import Ship from "./ship";

class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push([]);
      }
    }
  }

  place(x, y, direction, type) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "illegal position";
    }
    const ship = new Ship(type);

    if (direction === "hor") {
      const endPoint = y + ship.size() - 1;
      const isLegal = this.checkPositionHor(x, y, endPoint);

      if (isLegal) {
        this.pushHorizontal(x, y, endPoint, ship);
      } else {
        return "illegal position";
      }
    }

    if (direction === "ver") {
      const endPoint = x + ship.size() - 1;
      const isLegal = this.checkPositionVer(x, y, endPoint);

      if (isLegal) {
        this.pushVertical(x, y, endPoint, ship);
      } else {
        return "illegal position";
      }
    }
  }

  pushHorizontal(x, y, endPoint, ship) {
    for (let i = endPoint; i >= y; i--) {
      this.board[x][i].push(ship);
    }
  }

  pushVertical(x, y, endPoint, ship) {
    for (let i = endPoint; i >= x; i--) {
      this.board[i][y].push(ship);
    }
  }

  checkPositionHor(x, y, endPoint) {
    if (endPoint > 9) {
      return false;
    }

    for (let i = endPoint; i >= y; i--) {
      if (this.board[x][i].length) {
        return false;
      }
    }
    return true;
  }

  checkPositionVer(x, y, endPoint) {
    if (endPoint > 9) {
      return false;
    }

    for (let i = endPoint; i >= x; i--) {
      if (this.board[i][y].length) {
        return false;
      }
    }
    return true;
  }
}

export default Gameboard;
