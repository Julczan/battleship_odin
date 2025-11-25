import Ship from "../components/ship";

const ship = new Ship(2);

test("ship size is defined", () => {
  expect(ship.size()).toBe(2);
});

test("ship hit method", () => {
  expect(ship.hit()).toBe(1);
});

test("ship sunk", () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
