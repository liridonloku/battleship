/* eslint-disable import/prefer-default-export */
import { addEventListeners, loadGameElements } from "./DOM";
import { players, player } from "./player";

const game = () => {
  while (players.length > 0) {
    players.pop();
  }
  const player1 = player("Player");
  const player2 = player("Cpu");
  players.push(player1, player2);
  loadGameElements(player1, player2);
  const shipLengthOptions = [5, 4, 3, 3, 2];
  for (let i = 0; i < shipLengthOptions.length; i += 1) {
    while (player2.board.ships.length < i + 1) {
      player2.board.placeShip(
        shipLengthOptions[i],
        `${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}`
      );
    }
  }
  addEventListeners();
};

export { game };
