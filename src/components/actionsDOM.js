import {
  rednerGameboard,
  renderShips,
  displayGameboard,
} from "./rednerGameboard";
import { newGame, gameCourse } from "./gameDrive";
import getRandomCoords from "./computer";

const messageDiv = document.querySelector(".message");
const playerBoard = document.querySelector(".board-player");
const computerBoard = document.querySelector(".board-computer");

const game = newGame();
const playerShipsCoords = game.player.board.getShipsCoords();
const computerShipsCoords = game.computer.board.getShipsCoords();
const turn = game.currTurn;

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

export { attackComputer, attackPlayer };
