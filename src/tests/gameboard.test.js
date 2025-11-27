import Ship from "../components/ship";
import Gameboard from "../components/gameboard";

const gameboard = new Gameboard();
const ship = new Ship("submarine");
const battleship = new Ship("battleship");
const patrol = new Ship("patrol-boat");
const carrier = new Ship("carrier");

test("horizontal placement", () => {
  gameboard.place(0, 1, "hor", "submarine");
  expect(gameboard.board[0][1]).toEqual([ship]);
  expect(gameboard.board[0][3]).toEqual([ship]);
  expect(gameboard.board[0][4]).toEqual([]);
});

test("vertical placement", () => {
  gameboard.place(1, 5, "ver", "carrier");
  expect(gameboard.board[1][5]).toEqual([carrier]);
  expect(gameboard.board[5][5]).toEqual([carrier]);
  expect(gameboard.board[6][5]).toEqual([]);
});

test("prevent illegal placement", () => {
  expect(gameboard.place(0, 10, "hor", "submarine")).toBe("illegal position");
  expect(gameboard.place(-1, 2, "hor", "submarine")).toBe("illegal position");

  expect(gameboard.place(7, 7, "hor", "carrier")).toBe("illegal position");
  expect(gameboard.place(6, 1, "ver", "carrier")).toBe("illegal position");
});

test("prevent placement on taken position", () => {
  expect(gameboard.place(0, 1, "hor", "battleship")).toBe("illegal position");

  expect(gameboard.place(3, 3, "hor", "battleship")).toBe("illegal position");
});
