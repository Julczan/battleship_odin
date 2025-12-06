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

function placeShips() {
  //Create game phases - first one - placing ships
  //create a separate screen that lets user place ships
  //user has to place one ship of each type
  //add rotate button to place horizontally or vertically
  //if all ships are on the board Start Game button appears
  //change the screen to contain two boards when the button is clicked
  //the game begins
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

export { gameCourse };
