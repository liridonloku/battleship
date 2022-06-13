import { newBoard } from "./gameBoard";

const players = [];

const player = (name) => ({
  name,
  board: newBoard(),
  lastHit: "",
});

const aiShot = (board, lastHit) => {
  let illegalShot = true;
  let coordinate;
  // AI
  if (lastHit) {
    const x = parseInt(lastHit.charAt(0), 10);
    const y = parseInt(lastHit.charAt(2), 10);
    let i = 1;
    for (i; i <= 4; i += 1) {
      const index1 = `${x}-${y - i}`;
      const index2 = `${x}-${y + i}`;
      if (
        board.board.some((array) => array.indexOf(index1) > -1) &&
        board.attacks.indexOf(index1) < 0
      ) {
        coordinate = index1;
        return coordinate;
      }
      if (
        board.board.some((array) => array.indexOf(index2) > -1) &&
        board.attacks.indexOf(index2) < 0
      ) {
        coordinate = index2;
        return coordinate;
      }
    }
  }
  while (illegalShot) {
    const firstCoordinate = Math.floor(Math.random() * 10);
    const secondCoordinate = Math.floor(Math.random() * 10);
    coordinate = `${firstCoordinate}-${secondCoordinate}`;
    if (board.attacks.indexOf(coordinate) < 0) {
      illegalShot = false;
    }
  }
  return coordinate;
};

export { players, player, aiShot };
