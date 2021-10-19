import { aiShot, player } from "./player";

test("Player creation", () => {
  const player1 = player("player1");
  expect(player1.name).toBe("player1");
  expect(player1.board.board[0][0]).toBe("0-0");
});

test("Ai won't attack the same place twice", () => {
  const player1 = player("player1");

  // make sure all cells but one are attacked
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      player1.board.receiveAttack(`${i}-${j}`);
    }
  }
  for (let j = 0; j < 9; j += 1) {
    player1.board.receiveAttack(`9-${j}`);
  }

  // expect the new attack to be on the only remaining cell
  expect(aiShot(player1.board)).toBe("9-9");
});
