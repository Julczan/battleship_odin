import { Ship } from "./ship";

class Gameboard {
  constructor() {
    this.sunkCount = 0;
    this.shipCount = 0;
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push([{ hasShip: false }]);
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
        this.shipCount++;
      } else {
        return "illegal position";
      }
    }

    if (direction === "ver") {
      const endPoint = x + ship.size() - 1;
      const isLegal = this.checkPositionVer(x, y, endPoint);

      if (isLegal) {
        this.pushVertical(x, y, endPoint, ship);
        this.shipCount++;
      } else {
        return "illegal position";
      }
    }
  }

  pushHorizontal(x, y, endPoint, ship) {
    for (let i = endPoint; i >= y; i--) {
      this.board[x][i][0].hasShip = true;
      this.board[x][i].push(ship);
    }
  }

  pushVertical(x, y, endPoint, ship) {
    for (let i = endPoint; i >= x; i--) {
      this.board[i][y][0].hasShip = true;
      this.board[i][y].push(ship);
    }
  }

  checkPositionHor(x, y, endPoint) {
    if (endPoint > 9) {
      return false;
    }

    for (let i = endPoint; i >= y; i--) {
      if (this.board[x][i][0].hasShip) {
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
      if (this.board[i][y][0].hasShip) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "illegal attack";
    }

    if (
      this.board[x][y].includes("hit") ||
      this.board[x][y].includes("missed")
    ) {
      return "already attacked";
    }

    if (!this.board[x][y][0].hasShip) {
      this.board[x][y].push("missed");
      return "attack missed";
    }

    this.board[x][y].push("hit");
    this.board[x][y][1].hit();

    if (this.board[x][y][1].isSunk()) {
      this.sunkCount++;
    }

    return "ship hit";
  }

  gameOver() {
    if (this.shipCount === this.sunkCount) {
      return true;
    } else {
      return false;
    }
  }

  getShipsCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          coords.push([i, j]);
        }
      }
    }

    return coords;
  }

  getHitCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          if (this.board[i][j][2] === "hit") {
            coords.push([i, j]);
          }
        }
      }
    }
    return coords;
  }

  getMissedCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][1] === "missed") {
          coords.push([i, j]);
        }
      }
    }
    return coords;
  }

  getSunkCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          if (this.board[i][j][1].isSunk()) {
            coords.push([i, j]);
          }
        }
      }
    }
    return coords;
  }
}

export default Gameboard;
