import {
  rednerGameboard,
  renderShips,
  displayGameboard,
} from "./rednerGameboard";
import { newGame, gameCourse } from "./gameDrive";
import getRandomCoords from "./computer";

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

function attackPlayer() {
  const coords = getRandomCoords();
  const message = game.player.board.receiveAttack(coords[0], coords[1]);
  const missedAttacks = game.player.board.getMissedCoords();
  const hitAttacks = game.player.board.getHitCoords();
  const sunkShips = game.player.board.getSunkCoords();

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "player");
}

attackPlayer();

function attackComputer() {
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
  cell.addEventListener("click", attackComputer);
}

// if (turn === "player") {
//   letPlayerClick();
// }
// if (turn === "computer") {
// }

export { attackComputer };
