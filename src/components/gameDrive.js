import Player from "./player";
class Turns {
  constructor(player) {
    this.turn = player;
  }

  getCurrTurn() {
    return this.turn;
  }

  changeTurn(newPlayer) {
    this.turn = newPlayer;
  }
}

function newGame() {
  const player = new Player("player");
  const computer = new Player("computer");

  player.board.place(0, 1, "ver", "submarine");
  player.board.place(8, 1, "hor", "carrier");
  player.board.place(9, 3, "hor", "battleship");

  computer.board.place(1, 5, "ver", "submarine");
  computer.board.place(6, 1, "hor", "carrier");
  computer.board.place(8, 1, "hor", "battleship");

  const currTurn = new Turns("player");

  return { player, computer, currTurn };
}

function gameCourse(message, player, turn) {
  if (message === "gameover") {
    if (player === "player") {
      return displayWinner("Player");
    }
    if (player === "computer") {
      return displayWinner("Computer");
    }
  }

  if (message === "attack missed" && player === "player") {
    turn.changeTurn("computer");
  }
  if (message === "attack missed" && player === "computer") {
    turn.changeTurn("player");
  }
}

function displayWinner(player) {
  const message = `Game over! ${player} won!`;

  return message;
}

export { newGame, gameCourse };
