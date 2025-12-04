import {
  rednerGameboard,
  renderShips,
  displayGameboard,
} from "./rednerGameboard";
import { newGame, gameCourse } from "./gameDrive";

const game = newGame();
const turn = game.currTurn;

const playerBoard = document.querySelector(".board-player");
const computerBoard = document.querySelector(".board-computer");
const playerShipsCoords = game.player.board.getShipsCoords();
const computerShipsCoords = game.computer.board.getShipsCoords();

const computerCells = computerBoard.childNodes;

displayGameboard();
renderShips(playerShipsCoords, "player");
renderShips(computerShipsCoords, "computer");

function sendCoords() {
  const message = game.computer.board.receiveAttack(
    this.dataset.row,
    this.dataset.column
  );
  const missedAttacks = game.computer.board.getMissedCoords();
  const hitAttacks = game.computer.board.getHitCoords();
  const sunkShips = game.computer.board.getSunkCoords();

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "computer");

  gameCourse(message, turn);
}

for (const cell of computerCells) {
  cell.addEventListener("click", sendCoords);
}

// if (turn === "player") {
//   letPlayerClick();
// }
// if (turn === "computer") {
// }

export { sendCoords };
