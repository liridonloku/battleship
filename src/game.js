/* eslint-disable import/prefer-default-export */
import { addEventListeners, loadGameElements, loadShips } from "./DOM";
import { players, player } from "./player";

const game = () => {
  while (players.length > 0) {
    players.pop();
  }
  const player1 = player("player1");
  const player2 = player("cpu");
  players.push(player1, player2);
  loadGameElements(player1, player2);
  player1.board.placeShip(5, "0-0");
  player1.board.placeShip(4, "2-3");
  player1.board.placeShip(3, "5-6");
  player1.board.placeShip(3, "4-7");
  player1.board.placeShip(2, "8-2");
  player2.board.placeShip(5, "0-0");
  player2.board.placeShip(4, "2-3");
  player2.board.placeShip(3, "5-6");
  player2.board.placeShip(3, "4-7");
  player2.board.placeShip(2, "8-2");
  loadShips(player1);
  addEventListeners();
};

export { game };
