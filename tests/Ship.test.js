import Ship from '../src/Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(2);
  });

  test('get hit', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('get hit twice', () => {
    for (let i = 0; i < 2; i++) ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('get hit after sinking', () => {
    for (let i = 0; i < 4; i++) ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('check if sunk after one hit', () => {
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });

  test('check if sunk after two hits', () => {
    for (let i = 0; i < 2; i++) ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  test('set coordinates', () => {
    ship.setCoordinates([
      [1, 1],
      [1, 2],
    ]);
    expect(ship.coordinates.length).toBe(2);
    expect(ship.coordinates[1]).toEqual([1, 2]);
  });

  test('check if coordinate exists', () => {
    ship.setCoordinates([
      [1, 1],
      [1, 2],
    ]);
    expect(ship.hasCoordinate(1, 2)).toBeTruthy();
    expect(ship.hasCoordinate(0, 2)).toBeFalsy();
  });
});
