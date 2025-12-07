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

export { gameCourse, Turns };
