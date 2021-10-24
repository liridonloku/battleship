/* eslint-disable import/prefer-default-export */
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

export { loadGameElements };
