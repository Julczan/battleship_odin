import newGame from "./gameDrive";
import { markAsShip } from "./rednerGameboard";
import { rednerGameboard, renderShips } from "./rednerGameboard";

const game = newGame();

const playerBoard = document.querySelector(".board-player");
const computerBoard = document.querySelector(".board-computer");
const playerShipsCoords = game.player.board.getShipsCoords();
const computerShipsCoords = game.computer.board.getShipsCoords();

const computerCells = computerBoard.childNodes;

renderShips(playerShipsCoords, "player");
renderShips(computerShipsCoords, "computer");

function attackEnemy() {
  game.computer.board.receiveAttack(this.dataset.row, this.dataset.column);
  const missedAttacks = game.computer.board.getMissedCoords();
  const hitAttacks = game.computer.board.getHitCoords();
  const sunkShips = game.computer.board.getSunkCoords();
  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "computer");
}

for (const cell of computerCells) {
  cell.addEventListener("click", attackEnemy);
}

export { attackEnemy };
