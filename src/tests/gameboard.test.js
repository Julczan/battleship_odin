import Ship from "../components/ship";
import Gameboard from "../components/gameboard";

const gameboard = new Gameboard();
const ship = new Ship("submarine");
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

  gameboard.place(8, 1, "ver", "patrol-boat");
  expect(gameboard.board[9][1]).toEqual([patrol]);
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

  expect(gameboard.place(8, 0, "hor", "patrol-boat")).toBe("illegal position");
});

test("receive attack", () => {
  expect(gameboard.receiveAttack(-1, 12)).toBe("illegal attack");
  expect(gameboard.receiveAttack(0, 0)).toBe("attack missed");
  expect(gameboard.board[0][0]).toEqual(["missed"]);

  expect(gameboard.receiveAttack(1, 5)).toBe("ship hit");
  expect(gameboard.board[1][5]).toEqual([{ length: 5, strike: 1 }, "hit"]);

  expect(gameboard.receiveAttack(5, 5)).toBe("ship hit");
  expect(gameboard.board[5][5]).toEqual([{ length: 5, strike: 2 }, "hit"]);

  expect(gameboard.receiveAttack(9, 1)).toBe("ship hit");
  expect(gameboard.board[9][1]).toEqual([{ length: 2, strike: 1 }, "hit"]);
  expect(gameboard.board[8][1]).toEqual([{ length: 2, strike: 1 }]);
});

test("prevent attacking the same position two times", () => {
  expect(gameboard.receiveAttack(0, 0)).toBe("already attacked");

  expect(gameboard.receiveAttack(1, 5)).toBe("already attacked");
});

test("sinking a ship", () => {
  gameboard.receiveAttack(8, 1);
  expect(gameboard.sunkCount).toBe(1);
});

test("sinking every ship", () => {
  gameboard.receiveAttack(8, 1);
  expect(gameboard.sunkCount).toBe(1);

  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(0, 3);
  expect(gameboard.sunkCount).toBe(2);

  expect(gameboard.gameOver()).toBe("game is still running");

  gameboard.receiveAttack(2, 5);
  gameboard.receiveAttack(3, 5);
  gameboard.receiveAttack(4, 5);
  expect(gameboard.sunkCount).toBe(3);
  expect(gameboard.gameOver()).toBe("game over");
});
