import { shipFactory } from "./ship";

test("Create a ship", () => {
  expect(shipFactory([1, 2, 3, 4, 5])).toMatchObject({
    length: 5,
    coordinates: [1, 2, 3, 4, 5],
    hitPositions: [],
    isSunk: false,
  });
});

test("Register hits", () => {
  const ship = shipFactory([1, 2, 3, 4, 5]);
  ship.hit(3);
  expect(ship.hitPositions).toEqual([3]);
});

test("Ship is sunk", () => {
  const ship1 = shipFactory([1, 2, 3, 4]);
  const ship2 = shipFactory([1, 2, 3]);
  for (let i = 0; i < ship1.length; i += 1) {
    ship1.hit(i);
  }
  ship1.checkSunkStatus();
  ship2.checkSunkStatus();
  expect(ship1.hitPositions).toEqual([0, 1, 2, 3]);
  expect(ship1.isSunk).toBe(true);
  expect(ship2.isSunk).toBe(false);
});
