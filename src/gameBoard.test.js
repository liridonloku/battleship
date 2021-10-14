import { newBoard } from "./gameBoard";

test("Create new board", () => {
  const board = newBoard();
  expect(board[0][0]).toBe("0-0");
});
