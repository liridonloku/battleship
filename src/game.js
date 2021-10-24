import { loadGameElements } from "./DOM";
import { player } from "./player";

export default function game() {
  const player1 = player("player1");
  const player2 = player("cpu");
  loadGameElements(player1, player2);
}
