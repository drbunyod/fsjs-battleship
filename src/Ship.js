class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.coordinates = [];
  }

  hit() {
    if (this.hits < this.length) {
      this.hits = this.hits + 1;
    }
  }

  isSunk() {
    return this.hits === this.length;
  }

  setCoordinates(coordinates) {
    this.coordinates.push(...coordinates);
  }

  hasCoordinate(x, y) {
    for (const coordinate of this.coordinates) {
      if (coordinate[0] === x && coordinate[1] === y) {
        return true;
      }
    }

    return false;
  }
}

export default Ship;
