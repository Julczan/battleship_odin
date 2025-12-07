import {
  rednerGameboard,
  renderShips,
  addCells,
  placeShipsBoard,
} from "./rednerGameboard";
import Player from "./player";
import { gameCourse, Turns } from "./gameDrive";
import { getRandomCoords, getRandomNum } from "./computer";
import { ShipDirection, ShipTypes } from "./ship";

const messageDiv = document.querySelector(".message");
const dirBtn = document.createElement("button");
dirBtn.className = "dir-btn";
dirBtn.textContent = "Rotate";

const startBtn = document.createElement("button");
startBtn.classList = "dir-btn";
startBtn.textContent = "Start Game";

messageDiv.appendChild(dirBtn);

const display = document.querySelector(".display");

const playerBoard = document.createElement("div");
playerBoard.className = "board-player";

const computerBoard = document.createElement("div");
computerBoard.className = "board-computer";

const player = new Player("player");
const computer = new Player("computer");
const shipTypes = new ShipTypes();
const computerTypes = new ShipTypes();
const shipDir = new ShipDirection();
const turn = new Turns();

messageDiv.textContent = `Place your ${shipTypes.getType()}`;
messageDiv.appendChild(dirBtn);

dirBtn.addEventListener("click", function () {
  shipDir.changeDirection();
});

function startPlacement() {
  addCells(playerBoard, "playerBoard");
  display.appendChild(playerBoard);

  const playerCells = playerBoard.childNodes;

  for (const cell of playerCells) {
    cell.addEventListener("click", function (e) {
      placeShipPlayer(
        e.currentTarget,
        shipDir.getDirection(),
        shipTypes.getType()
      );
    });
  }
}

// const turn = game.currTurn;

const computerCells = computerBoard.childNodes;

function startGame() {
  // const playerShipsCoords = player.board.getShipsCoords();
  // console.log(playerShipsCoords);
  // addCells(playerBoard, "playerBoard");
  // const computerShipsCoords = computer.board.getShipsCoords();
  // renderShips(playerShipsCoords, "player");
  // renderShips(computerShipsCoords, "computer");
}

function placeShipComputer() {
  if (computerTypes.getType() === "none") {
    return;
  }

  const coords = getRandomCoords();
  const num = getRandomNum();

  let direction = "";

  if (num === 0) {
    direction = "hor";
  }
  if (num === 1) {
    direction = "ver";
  }

  const message = computer.board.place(
    coords[0],
    coords[1],
    direction,
    computerTypes.getType()
  );

  if (message === "illegal position") {
    placeShipComputer();
  } else {
    computerTypes.nextType();
    placeShipComputer();
  }
}

function test() {
  display.textContent = "";
  addCells(computerBoard, "computerBoard");
  display.appendChild(computerBoard);
  placeShipComputer();
  const computerShipsCoords = computer.board.getShipsCoords();

  renderShips(computerShipsCoords, "computer");
}

function placeShipPlayer(target, direction, name) {
  const message = player.board.place(
    +target.dataset.row,
    +target.dataset.column,
    direction,
    name
  );
  if (message === "illegal position") {
    return;
  }

  const playerShipsCoords = player.board.getShipsCoords();

  renderShips(playerShipsCoords, "player");
  shipTypes.nextType();

  if (shipTypes.getType() === "none") {
    showMessage("start");
  } else {
    showMessage("placement");
  }
}

function showMessage(stage) {
  if (stage === "placement") {
    messageDiv.textContent = `Place your ${shipTypes.getType()}`;
    messageDiv.appendChild(dirBtn);
  }
  if (stage === "start") {
    messageDiv.textContent = "Start the game";
    messageDiv.appendChild(startBtn);
    startBtn.addEventListener("click", () => {
      startGame();
    });
  }
}

function attackPlayer() {
  const coords = getRandomCoords();
  const message = game.player.board.receiveAttack(coords[0], coords[1]);
  const missedAttacks = game.player.board.getMissedCoords();
  const hitAttacks = game.player.board.getHitCoords();
  const sunkShips = game.player.board.getSunkCoords();
  const gameover = game.player.board.gameOver();

  if (gameover) {
    const winner = gameCourse("gameover", "computer");
    messageDiv.textContent = winner;
    stopGame();
  }

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "player");

  if (message === "already attacked" || message === "ship hit") {
    attackPlayer();
  }

  gameCourse(message, "computer", turn);
}

function attackComputer() {
  const message = game.computer.board.receiveAttack(
    this.dataset.row,
    this.dataset.column
  );
  const missedAttacks = game.computer.board.getMissedCoords();
  const hitAttacks = game.computer.board.getHitCoords();
  const sunkShips = game.computer.board.getSunkCoords();
  const gameover = game.computer.board.gameOver();

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "computer");

  if (gameover) {
    const winner = gameCourse("gameover", "player");
    messageDiv.textContent = winner;
    stopGame();
  }

  gameCourse(message, "player", turn);

  if (turn.getCurrTurn() === "computer") {
    attackPlayer();
  }
}

for (const cell of computerCells) {
  cell.addEventListener("click", attackComputer);
}

function stopGame() {
  for (const cell of computerCells) {
    cell.removeEventListener("click", attackComputer);
  }
}

// startPlacement();
test();

export { attackComputer, attackPlayer };
