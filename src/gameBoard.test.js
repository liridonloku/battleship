import { newBoard } from "./gameBoard";

test("Create new board", () => {
  const board = newBoard();
  expect(board.board[0][0]).toBe("0-0");
});

test("Place ship", () => {
  const board = newBoard();
  const board2 = newBoard();
  board.placeShip(3, "5-5");
  expect(board.ships[0]).toHaveLength(3);
  expect(board.ships[0].coordinates).toEqual(["5-5", "5-6", "5-7"]);
  expect(board2.ships[0]).toBe(undefined);
});

test("Receive Attack - ship hit", () => {
  const board = newBoard();
  board.placeShip(3, "5-5");
  expect(board.receiveAttack("5-6")).toBe("Hit");
  expect(board.ships[0].hitPositions).toEqual(["5-6"]);
});

test("Attack same cell twice and miss", () => {
  const board = newBoard();
  expect(board.receiveAttack("4-5")).toBe("Miss");
  expect(board.receiveAttack("4-5")).toBe(
    "Can't attack same position more than once"
  );
});

test("All ships are sunk", () => {
  const board = newBoard();
  board.placeShip(3, "3-3");
  board.receiveAttack("3-3");
  board.receiveAttack("3-4");
  board.receiveAttack("3-5");
  expect(board.allShipsSunk()).toBe(true);
});
