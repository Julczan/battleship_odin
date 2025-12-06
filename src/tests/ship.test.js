import { Ship } from "../components/ship";

const ship = new Ship("patrol-boat");
const largeShip = new Ship("carrier");

test("ship size is defined", () => {
  expect(ship.size()).toBe(2);
  expect(largeShip.size()).toBe(5);
});

test("ship hit method", () => {
  ship.hit();
  expect(ship.strike).toBe(1);
});

test("ship sunk", () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
