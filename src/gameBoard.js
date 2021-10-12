/* eslint-disable import/prefer-default-export */
const gameBoard = () => {
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push(`${i}-${j}`);
    }
    array.push(row);
  }
  return {
    board: array,
  };
};

export { gameBoard };
