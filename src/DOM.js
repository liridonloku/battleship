/* eslint-disable import/prefer-default-export */
import { aiShot, players } from "./player";

const domElements = {
  player1Name: document.querySelector(".left-content>.player-info"),
  player1Board: document.querySelector(".left-content>.board-container>.board"),
  player2Name: document.querySelector(".right-content>.player-info"),
  player2Board: document.querySelector(
    ".right-content>.board-container>.board"
  ),
};

const loadGameElements = (player1, player2) => {
  domElements.player1Name.textContent = player1.name;
  domElements.player2Name.textContent = player2.name;
  player1.board.board.forEach((row) => {
    row.forEach((element) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coordinate", element);
      domElements.player1Board.appendChild(cell);
    });
  });
  player2.board.board.forEach((row) => {
    row.forEach((element) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coordinate", element);
      domElements.player2Board.appendChild(cell);
    });
  });
};

const loadShips = (player) => {
  player.board.ships.forEach((ship) => {
    ship.coordinates.forEach((position) => {
      domElements.player1Board
        .querySelector(`[data-coordinate='${position}']`)
        .classList.add("ship");
    });
  });
};

const attack = (e) => {
  players[1].board.receiveAttack(`${e.target.getAttribute("data-coordinate")}`);
  let condition = false;
  players[1].board.ships.forEach((ship) => {
    if (
      ship.coordinates.some(
        (item) => item === `${e.target.getAttribute("data-coordinate")}`
      )
    ) {
      condition = true;
    }
  });
  if (condition) {
    e.target.classList.add("hit");
  } else {
    e.target.classList.add("miss");
  }

  if (players[1].board.allShipsSunk()) {
    // implement a modal for result and game restart
  }
  setTimeout(() => {
    const coordinate = aiShot(players[0].board);
    players[0].board.receiveAttack(coordinate);
    condition = false;
    players[0].board.ships.forEach((ship) => {
      if (ship.coordinates.some((item) => item === coordinate)) {
        condition = true;
      }
    });
    if (condition) {
      domElements.player1Board
        .querySelector(`[data-coordinate="${coordinate}"]`)
        .classList.add("hit");
    } else {
      domElements.player1Board
        .querySelector(`[data-coordinate="${coordinate}"]`)
        .classList.add("miss");
    }

    if (players[0].board.allShipsSunk()) {
      // implement a modal for result and game restart
    }
  }, 500);
};

const addEventListeners = () => {
  domElements.player2Board.addEventListener("click", attack);
};

export { loadGameElements, loadShips, addEventListeners };
