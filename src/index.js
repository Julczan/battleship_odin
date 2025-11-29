import "./styles.css";

const playerBoard = document.querySelector(".board-player");
const computerBoard = document.querySelector(".board-computer");

function addCells(board) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
    const number = i / 10;
    const rowNum = String(number).charAt(0);
    let columnNum = String(number).charAt(2);
    if (columnNum === "") {
      columnNum = 0;
    }
    cell.dataset.row = rowNum;
    cell.dataset.column = columnNum;
  }
}

addCells(playerBoard);
addCells(computerBoard);
