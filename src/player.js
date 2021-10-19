/* eslint-disable import/prefer-default-export */
import { newBoard } from "./gameBoard";

const player = (name) => ({
  name,
  board: newBoard(),
});

export { player };
