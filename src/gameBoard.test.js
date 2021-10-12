import { gameBoard } from "./gameBoard";

test("Create gameBoard", () => {
  const board = gameBoard();
  expect(board.board[0][0]).toBe("0-0");
});
