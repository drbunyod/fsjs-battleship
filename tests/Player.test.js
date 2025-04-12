import Player from '../src/Player';

describe('Player', () => {
  let player1, player2;

  beforeEach(() => {
    player1 = new Player('computer');
    player2 = new Player('real');
  });

  test('create player', () => {
    expect(player1.type).toBe('computer');
    expect(player2.type).toBe('real');
  });

  test('randomize grid', () => {
    const oldGrid = player1.gameboard.grid;
    expect(player1.gameboard.grid).toEqual(oldGrid);
    player1.randomizeGrid();
    expect(player1.gameboard.grid).not.toEqual(oldGrid);
  });
});
