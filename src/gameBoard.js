/* eslint-disable import/prefer-default-export */

import { shipFactory } from "./ship";

/* const shipModel = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2,
}; */

const newBoard = () => {
  const ships = [];
  const board = [];
  const attacks = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push(`${i}-${j}`);
    }
    board.push(row);
  }
  function placeShip(length, position) {
    if (10 - position.charAt(2) < length) {
      throw new Error("Can't place a ship of that length there");
    } else {
      const coordinates = [];
      const firstCoordinate = parseInt(position.charAt(0), 10);
      const secondCoordinate = parseInt(position.charAt(2), 10);
      for (let i = 0; i < length; i += 1) {
        coordinates.push(`${firstCoordinate}-${secondCoordinate + i}`);
      }
      const newShip = shipFactory(coordinates);
      ships.push(newShip);
    }
  }
  function receiveAttack(coordinates) {
    if (attacks.indexOf(coordinates) >= 0) {
      return "Can't attack same position more than once";
    }
    let hitShip = false;
    ships.forEach((ship) => {
      ship.coordinates.forEach((position) => {
        if (position === coordinates) {
          ship.hit(position);
          hitShip = true;
        }
      });
    });
    attacks.push(coordinates);
    return hitShip ? "Hit" : "Miss";
  }
  return { board, ships, placeShip, receiveAttack };
};

export { newBoard };
