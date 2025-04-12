import Gameboard from '../src/Gameboard';

describe('Gameboard', () => {
  let gb;

  beforeEach(() => {
    gb = new Gameboard();
  });

  test('create grid', () => {
    expect(gb.grid.length).toBe(10);
    expect(gb.grid[0].length).toBe(10);
    expect(gb.grid[0][0]).toBe(null);
  });
});
