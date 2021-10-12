import { shipFactory } from "./ship";

test("Create a ship", () => {
  expect(shipFactory(5)).toMatchObject({
    length: 5,
    hitPositions: [],
    isSunk: false,
  });
});

test("Register hits", () => {
  const ship = shipFactory(5);
  ship.hit(3);
  expect(ship.hitPositions).toEqual([3]);
});

test("Ship is sunk", () => {
  const length = 4;
  const ship1 = shipFactory(length);
  const ship2 = shipFactory(3);
  for (let i = 0; i < length; i += 1) {
    ship1.hit(i);
  }
  ship1.checkSunkStatus();
  ship2.checkSunkStatus();
  expect(ship1.hitPositions).toEqual([0, 1, 2, 3]);
  expect(ship1.isSunk).toBe(true);
  expect(ship2.isSunk).toBe(false);
});
