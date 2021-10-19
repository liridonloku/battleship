import { newBoard } from "./gameBoard";

const player = (name) => ({
  name,
  board: newBoard(),
});

const aiShot = (board) => {
  let illegalShot = true;
  let coordinate;
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

export { player, aiShot };
