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

function gameCourse(message, turn) {
  if (message === "attack missed") {
    turn.changeTurn("computer");
  }
  //let The player attack
  //wait for the player to click on board
  //if hit - attack again
  //if miss - let the computer attack
  //don't let the player click
  //if computer hit - attack again
  //if computer miss - let the player attack
  //if gameover() - display the winner
}

export { newGame, gameCourse };
