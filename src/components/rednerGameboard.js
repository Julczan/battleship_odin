import newGame from "./gameDrive";

const game = newGame();

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
    if (board === playerBoard) {
      cell.dataset.name = "player";
    } else {
      cell.dataset.name = "computer";
    }
  }
}

function displayGameboard() {
  addCells(playerBoard);
  addCells(computerBoard);
}

function markAsShip([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "hasShip";
}

function markAsMissed([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "missed";
}

function markAsHit([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "hit";
}

function markAsSunk([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "sunk";
}

displayGameboard();

function rednerGameboard(missedAttacks, hitAttacks, sunkShips, player) {
  // playerCoords.forEach((coord) => {
  //   markAsShip(coord, player);
  // });

  if (missedAttacks) {
    missedAttacks.forEach((coord) => {
      markAsMissed(coord, player);
    });
  }

  if (hitAttacks) {
    hitAttacks.forEach((coord) => {
      markAsHit(coord, player);
    });
  }

  if (sunkShips) {
    sunkShips.forEach((coord) => {
      markAsSunk(coord, player);
    });
  }
}

function renderShips(playerCoords, player) {
  playerCoords.forEach((coord) => {
    markAsShip(coord, player);
  });
}

export { displayGameboard, rednerGameboard, renderShips };
