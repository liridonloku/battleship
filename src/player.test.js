import { player } from "./player";

test("Player creation", () => {
  const player1 = player("player1");
  expect(player1.name).toBe("player1");
  expect(player1.board.board[0][0]).toBe("0-0");
});
