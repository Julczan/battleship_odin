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
        this.length = 3;
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

class ShipTypes {
  constructor() {
    this.type = "carrier";
  }

  getType() {
    return this.type;
  }

  nextType() {
    switch (this.type) {
      case "carrier":
        this.type = "battleship";
        break;
      case "battleship":
        this.type = "destroyer";
        break;
      case "destroyer":
        this.type = "submarine";
        break;
      case "submarine":
        this.type = "patrol-boat";
        break;
      case "patrol-boat":
        this.type = "none";
        break;
    }
  }
}

class ShipDirection {
  constructor() {
    this.direction = "hor";
  }

  getDirection() {
    return this.direction;
  }

  changeDirection() {
    if (this.direction === "hor") {
      this.direction = "ver";
    } else {
      this.direction = "hor";
    }
  }
}

export { Ship, ShipTypes, ShipDirection };
