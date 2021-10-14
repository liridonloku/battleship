/* eslint-disable import/prefer-default-export */

/* const shipModel = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2,
}; */

const newBoard = () => {
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push(`${i}-${j}`);
    }
    array.push(row);
  }
  return array;
};

export { newBoard };
