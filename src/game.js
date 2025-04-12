import Player from './Player';

class GameManager {
  constructor(vs) {
    this.player1 = new Player('real');
    this.player2 = new Player(vs);
    this.isRunning = false;
    this.turn = null;
    this.winner = null;
  }

  start() {
    this.isRunning = true;
    this.turn = 1;
  }

  restart() {
    this.isRunning = false;
    this.turn = null;
    this.player1.randomizeGrid();
    this.player2.randomizeGrid();
  }

  end(winner) {
    this.isRunning = false;
    this.winner = winner;
  }

  attackBoard(x, y) {
    if (this.isRunning) {
      if (this.turn === 1) {
        const hit = this.player2.gameboard.receiveAttack(x, y);
        if (hit && this.player2.gameboard.areAllShipsSunk()) this.end(1);
        if (!hit) this.turn = 2;
      } else if (this.turn === 2) {
        const hit = this.player1.gameboard.receiveAttack(x, y);
        if (hit && this.player1.gameboard.areAllShipsSunk()) this.end(2);
        if (!hit) this.turn = 1;
      }
    }
  }

  computerAttack() {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const cell = this.player1.gameboard.grid[x][y];
      if (cell === null || cell === 1) {
        this.attackBoard(x, y);
        return;
      }
    }
  }
}

export default GameManager;
