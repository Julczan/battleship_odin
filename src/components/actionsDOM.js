import newGame from "./gameDrive";
import { markAsShip } from "./rednerGameboard";

const game = newGame();

const playerBoard = document.querySelector(".board-player");
const computerBoard = document.querySelector(".board-computer");

const computerCells = computerBoard.childNodes;

function getCellCoords() {
  console.log([this.dataset.row, this.dataset.column]);
  const message = game.computer.board.receiveAttack(
    this.dataset.row,
    this.dataset.column
  );
}

for (const cell of computerCells) {
  cell.addEventListener("click", getCellCoords);
}

export { getCellCoords };
