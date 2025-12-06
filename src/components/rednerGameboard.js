// const display = document.querySelector(".display");

// const playerBoard = document.createElement("div");
// playerBoard.className = "board-player";

// const computerBoard = document.createElement("div");
// computerBoard.className = "board-computer";

function addCells(board, type) {
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
    if (type === "playerBoard") {
      cell.dataset.name = "player";
    }
    if (type === "computerBoard") {
      cell.dataset.name = "computer";
    }
  }
}

// function displayGameboard(phase) {
//   if (phase === "starting") {
//     addCells(playerBoard);
//     display.appendChild(playerBoard);
//   } else {
//     addCells(playerBoard);
//     addCells(computerBoard);
//     display.appendChild(playerBoard);
//     display.appendChild(computerBoard);
//   }
// }

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

function rednerGameboard(missedAttacks, hitAttacks, sunkShips, player) {
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

export { rednerGameboard, renderShips, addCells };
