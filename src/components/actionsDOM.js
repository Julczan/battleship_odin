import {
  rednerGameboard,
  renderShips,
  addCells,
  placeShipsBoard,
} from "./rednerGameboard";
import Player from "./player";

import { gameCourse } from "./gameDrive";
import getRandomCoords from "./computer";
import { ShipTypes } from "./ship";

const messageDiv = document.querySelector(".message");

const display = document.querySelector(".display");

const playerBoard = document.createElement("div");
playerBoard.className = "board-player";

const computerBoard = document.createElement("div");
computerBoard.className = "board-computer";

const player = new Player("player");
const computer = new Player("computer");
const shipTypes = new ShipTypes();

function startGame() {
  addCells(playerBoard, "playerBoard");
  display.appendChild(playerBoard);

  const playerCells = playerBoard.childNodes;

  for (const cell of playerCells) {
    cell.addEventListener("click", function (e) {
      placeShip(e.currentTarget, "ver", shipTypes.getType());
    });
  }
}

// const playerShipsCoords = game.player.board.getShipsCoords();
// const computerShipsCoords = game.computer.board.getShipsCoords();
// const turn = game.currTurn;

const computerCells = computerBoard.childNodes;

// renderShips(playerShipsCoords, "player");
// renderShips(computerShipsCoords, "computer");

function placeShip(target, direction, name) {
  const message = player.board.place(
    +target.dataset.row,
    +target.dataset.column,
    direction,
    name
  );
  console.log(message);
  if (message === "illegal position") {
    return;
  }

  const playerShipsCoords = player.board.getShipsCoords();

  renderShips(playerShipsCoords, "player");
  shipTypes.nextType();
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

startGame();

export { attackComputer, attackPlayer };
