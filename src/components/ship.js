class Ship {
  constructor(type) {
    this.strike = 0;
    this.getLength(type);
  }
  size() {
    return this.length;
  }

  hit() {
    this.strike++;
    return this.strike;
  }

  getLength(type) {
    switch (type) {
      case "carrier":
        this.length = 5;
        break;
      case "battleship":
        this.length = 4;
        break;
      case "destroyer":
        this.length = 4;
        break;
      case "submarine":
        this.length = 3;
        break;
      case "patrol-boat":
        this.length = 2;
        break;
    }
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
