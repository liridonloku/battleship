import { loadGameElements, loadShips } from "./DOM";
import { player } from "./player";

export default function game() {
  const player1 = player("player1");
  const player2 = player("cpu");
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
}
