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
    const ship = new Ship(type);
    this.board[x][y].push(ship);
    for (let i = ship.size() - 1; i > 0; i--) {
      this.board[x][y + i].push(ship);
    }
  }
}

export default Gameboard;
