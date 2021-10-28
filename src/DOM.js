/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { game } from "./game";
import { aiShot, players } from "./player";

const domElements = {
  player1Name: document.querySelector(".left-content>.player-info"),
  player1Board: document.querySelector(".left-content>.board-container>.board"),
  player2Name: document.querySelector(".right-content>.player-info"),
  player2Board: document.querySelector(
    ".right-content>.board-container>.board"
  ),
  instructions: document.querySelector(".instructions"),
  currentShip: document.querySelector(".current-ship"),
  overlay: document.querySelector(".overlay"),
  endMessage: document.querySelector(".end-message"),
  resetButton: document.getElementById("reset"),
};

const loadGameElements = (player1, player2) => {
  domElements.player1Name.textContent = player1.name;
  domElements.player2Name.textContent = player2.name;
  domElements.player1Board.replaceChildren();
  domElements.player2Board.replaceChildren();
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
  e.stopPropagation();
  if (
    players[1].board.attacks.indexOf(
      `${e.target.getAttribute("data-coordinate")}`
    ) >= 0
  ) {
    return;
  }
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
    domElements.endMessage.textContent = "You Win! All enemy ships have sunk.";
    domElements.overlay.classList.add("visible");
    return;
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
      domElements.endMessage.textContent =
        "You Lose! All your ships have sunk.";
      domElements.overlay.classList.add("visible");
    }
  }, 500);
};

const placeShips = (e) => {
  switch (players[0].board.ships.length) {
    default:
      return;
    case 0:
      players[0].board.placeShip(
        5,
        `${e.target.getAttribute("data-coordinate")}`
      );
      loadShips(players[0]);
      break;
    case 1:
      players[0].board.placeShip(
        4,
        `${e.target.getAttribute("data-coordinate")}`
      );
      loadShips(players[0]);
      break;
    case 2:
    case 3:
      players[0].board.placeShip(
        3,
        `${e.target.getAttribute("data-coordinate")}`
      );
      loadShips(players[0]);
      break;
    case 4:
      players[0].board.placeShip(
        2,
        `${e.target.getAttribute("data-coordinate")}`
      );
      loadShips(players[0]);
      break;
  }
  domElements.player1Board
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("hover"));
  // eslint-disable-next-line no-use-before-define
  updateInstructions();
  if (players[0].board.ships.length === 5) {
    domElements.player1Board.removeEventListener("click", placeShips);
    domElements.player2Board.addEventListener("click", attack);
  }
};

const hoverIn = (e) => {
  const position = e.target.getAttribute("data-coordinate");
  const firstCoordinate = parseInt(position.charAt(0), 10);
  const secondCoordinate = parseInt(position.charAt(2), 10);
  switch (players[0].board.ships.length) {
    default:
      break;
    case 0:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 5, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.add("hover");
      }
      break;
    case 1:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 4, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.add("hover");
      }
      break;
    case 2:
    case 3:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 3, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.add("hover");
      }
      break;
    case 4:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 2, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.add("hover");
      }
      break;
  }
};

const hoverOut = (e) => {
  const position = e.target.getAttribute("data-coordinate");
  const firstCoordinate = parseInt(position.charAt(0), 10);
  const secondCoordinate = parseInt(position.charAt(2), 10);
  switch (players[0].board.ships.length) {
    default:
      break;
    case 0:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 5, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.remove("hover");
      }
      break;
    case 1:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 4, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.remove("hover");
      }
      break;
    case 2:
    case 3:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 3, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.remove("hover");
      }
      break;
    case 4:
      for (
        let i = secondCoordinate;
        i < Math.min(secondCoordinate + 2, 10);
        i += 1
      ) {
        const coordinates = `${firstCoordinate}-${i}`;
        domElements.player1Board
          .querySelector(`[data-coordinate="${coordinates}"]`)
          .classList.remove("hover");
      }
      break;
  }
};

const updateInstructions = () => {
  switch (players[0].board.ships.length) {
    default:
      break;
    case 0:
      domElements.instructions.textContent =
        "Welcome to Battleship! Place your ships on your board by clicking a cell.";
      domElements.currentShip.textContent = "Current Ship: Carrier (length: 5)";
      break;
    case 1:
      domElements.currentShip.textContent =
        "Current Ship: Battleship (length: 4)";
      break;
    case 2:
      domElements.currentShip.textContent =
        "Current Ship: Destroyer (length: 3)";
      break;
    case 3:
      domElements.currentShip.textContent =
        "Current Ship: Submarine (length: 3)";
      break;
    case 4:
      domElements.currentShip.textContent =
        "Current Ship: Patrol Boat (length: 2)";
      break;
    case 5:
      domElements.currentShip.textContent = "";
      domElements.instructions.textContent =
        "Attack the enemy board by clicking on their cells";
      break;
  }
};

const addEventListeners = () => {
  domElements.player1Board.addEventListener("click", placeShips);
  domElements.player1Board.addEventListener("mouseover", hoverIn);
  domElements.player1Board.addEventListener("mouseout", hoverOut);
};

domElements.resetButton.addEventListener("click", () => {
  domElements.overlay.classList.remove("visible");
  domElements.endMessage.textContent = "";
  game();
  updateInstructions();
});

export { loadGameElements, loadShips, addEventListeners };
