import "./styles.css";
import { displayGameboard, markAsShip } from "./components/rednerGameboard";
import newGame from "./components/gameDrive";

const playerCoords = newGame().player.board.getShipsCoords();
const computerCoords = newGame().computer.board.getShipsCoords();

displayGameboard();

playerCoords.forEach((coord) => {
  markAsShip(coord, "player");
});

computerCoords.forEach((coord) => {
  markAsShip(coord, "computer");
});
