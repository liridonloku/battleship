/* eslint-disable import/prefer-default-export */
const shipFactory = (coordinates) => ({
  length: coordinates.length,
  coordinates,
  hitPositions: [],
  isSunk: false,
  hit(position) {
    this.hitPositions.push(position);
  },
  checkSunkStatus() {
    if (this.hitPositions.length !== this.length) {
      return;
    }
    this.isSunk = true;
  },
});

export { shipFactory };
