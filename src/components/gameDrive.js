import Ship from "./ship";
import Player from "./player";
import Gameboard from "./gameboard";
import { markAsShip, displayGameboard } from "./rednerGameboard";

function newGame() {
  const player = new Player("player");
  const computer = new Player("computer");

  player.board.place(0, 1, "ver", "submarine");
  player.board.place(8, 1, "hor", "carrier");
  player.board.place(9, 3, "hor", "battleship");

  computer.board.place(1, 5, "ver", "submarine");
  computer.board.place(6, 1, "hor", "carrier");
  computer.board.place(8, 1, "hor", "battleship");

  return { player, computer };
}

export default newGame;
