import Player from "../components/player";
import Gameboard from "../components/gameboard";

const player = new Player("player");
const computer = new Player("computer");
const playerGameboard = new Gameboard();
const computerGameboard = new Gameboard();

test("computer and real player types", () => {
  expect(player.board).toEqual(playerGameboard);
  expect(computer.board).toEqual(computerGameboard);
});
