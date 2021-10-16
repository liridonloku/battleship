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

test("Receive Attack", () => {});
