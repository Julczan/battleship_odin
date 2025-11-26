import Ship from "../components/ship";
import Gameboard from "../components/gameboard";

const gameboard = new Gameboard();
const ship = new Ship("submarine");
const battleship = new Ship("battleship");
const patrol = new Ship("patrol-boat");

test("ship gets placed on the gameboard", () => {
  gameboard.place(0, 1, "ver", "submarine");
  expect(gameboard.board[0][1]).toEqual([ship]);
  expect(gameboard.board[0][3]).toEqual([ship]);
  expect(gameboard.board[0][4]).toEqual([]);

  gameboard.place(3, 1, "ver", "battleship");
  expect(gameboard.board[3][1]).toEqual([battleship]);
  expect(gameboard.board[3][4]).toEqual([battleship]);
  expect(gameboard.board[0][5]).toEqual([]);

  gameboard.place(4, 1, "ver", "patrol-boat");
  expect(gameboard.board[4][1]).toEqual([patrol]);
  expect(gameboard.board[4][2]).toEqual([patrol]);
});
