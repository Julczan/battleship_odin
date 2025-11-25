class Ship {
  constructor(length) {
    this.length = length;
    this.strike = 0;
  }
  size() {
    return this.length;
  }

  hit() {
    this.strike++;
    return this.strike;
  }

  isSunk() {
    if (this.strike < this.length) {
      return false;
    } else {
      return true;
    }
  }
}

export default Ship;
