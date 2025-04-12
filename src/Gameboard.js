import Ship from './Ship';

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null)
    );
    this.ships = this.createShips();
    this.placeShips();
  }

  createShips() {
    const ships = [];

    ships.push(new Ship(4));
    for (let i = 0; i < 2; i++) ships.push(new Ship(3));
    for (let i = 0; i < 3; i++) ships.push(new Ship(2));
    for (let i = 0; i < 4; i++) ships.push(new Ship(1));

    return ships;
  }

  placeShips() {
    for (const ship of this.ships) {
      let coordinates, surroundings;
      while (true) {
        let startRow, startCol, startDir;
        while (true) {
          startRow = Math.floor(Math.random() * 10);
          startCol = Math.floor(Math.random() * 10);
          startDir = Math.floor(Math.random() * 2);
          if (this.isValidStart(startRow, startCol, startDir, ship.length)) {
            break;
          }
        }

        coordinates = this.getShipCoordinates(
          startRow,
          startCol,
          startDir,
          ship.length
        );
        surroundings = this.getShipSurroundings(
          startRow,
          startCol,
          startDir,
          ship.length
        );

        if (this.isValidPosition([...coordinates, ...surroundings])) {
          break;
        }
      }

      this.placeShip(coordinates);
      ship.setCoordinates(coordinates);
    }
  }

  placeShip(coordinates) {
    for (const coordinate of coordinates) {
      this.grid[coordinate[0]][coordinate[1]] = 1;
    }
  }

  isValidStart(row, col, dir, length) {
    if (dir === 0) {
      return col + length - 1 < 10;
    } else if (dir === 1) {
      return row + length - 1 < 10;
    }
  }

  isValidPosition(coordinates) {
    for (const coordinate of coordinates) {
      if (
        coordinate[0] >= 0 &&
        coordinate[0] < 10 &&
        coordinate[1] >= 0 &&
        coordinate[1] < 10
      ) {
        if (this.grid[coordinate[0]][coordinate[1]] !== null) {
          return false;
        }
      }
    }

    return true;
  }

  getShipCoordinates(row, col, dir, length) {
    const coordinates = [];

    for (let i = 0; i < length; i++) {
      if (dir === 0) {
        coordinates.push([row, col + i]);
      } else if (dir === 1) {
        coordinates.push([row + i, col]);
      }
    }

    return coordinates;
  }

  getShipSurroundings(row, col, dir, length) {
    const coordinates = [];

    for (let i = 0; i < length; i++) {
      if (dir === 0) {
        coordinates.push([row - 1, col + i]);
        coordinates.push([row + 1, col + i]);
      } else if (dir === 1) {
        coordinates.push([row + i, col - 1]);
        coordinates.push([row + i, col + 1]);
      }
    }

    for (let i = -1; i <= 1; i++) {
      if (dir === 0) {
        coordinates.push([row + i, col - 1]);
        coordinates.push([row + i, col + length]);
      } else if (dir === 1) {
        coordinates.push([row - 1, col + i]);
        coordinates.push([row + length, col + i]);
      }
    }

    return coordinates;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] === 1) {
      for (const ship of this.ships) {
        if (ship.hasCoordinate(x, y)) {
          ship.hit();
          this.grid[x][y] = 2;
          if (ship.isSunk()) {
            this.revealSurroundings(ship);
          }
          return true;
        }
      }
    } else if (this.grid[x][y] === null) {
      this.grid[x][y] = 0;
      return false;
    }
  }

  revealSurroundings(ship) {
    let shipDirection = 0;
    if (ship.length > 1) {
      shipDirection = Math.abs(ship.coordinates[0][0] - ship.coordinates[1][0]);
    }

    const surroundings = this.getShipSurroundings(
      ship.coordinates[0][0],
      ship.coordinates[0][1],
      shipDirection,
      ship.length
    );
    for (const surrounding of surroundings) {
      if (
        surrounding[0] >= 0 &&
        surrounding[0] < 10 &&
        surrounding[1] >= 0 &&
        surrounding[1] < 10
      ) {
        if (this.grid[surrounding[0]][surrounding[1]] === null) {
          this.grid[surrounding[0]][surrounding[1]] = 0;
        }
      }
    }
  }

  getRemainingShips() {
    let count = 0;

    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        count++;
      }
    }

    return count;
  }

  areAllShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }

    return true;
  }
}

export default Gameboard;
