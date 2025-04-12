class DOMManager {
  constructor(game) {
    this.game = game;
    this.gameStatusText = document.querySelector('#game-status');
    this.player1Board = document.querySelector('#player-1-board');
    this.player2Board = document.querySelector('#player-2-board');
    this.player1RemainingShips = document.querySelector('#player-1-ships');
    this.player2RemainingShips = document.querySelector('#player-2-ships');
    this.playButton = document.querySelector('#play-button');
    this.randomizeButton = document.querySelector('#randomize-button');

    this.playButton.addEventListener('click', (e) => {
      if (e.target.classList.contains('play')) {
        this.game.start();
      } else if (e.target.classList.contains('restart')) {
        const restart = confirm('Are you sure you want to restart?');
        if (restart) {
          this.game.restart();
        }
      }

      this.updateScreen();
    });

    this.randomizeButton.addEventListener('click', () => {
      this.game.player1.randomizeGrid();
      this.updateScreen();
    });
  }

  displayBoard(board, grid, self = true) {
    board.innerHTML = '';
    const cell = document.createElement('div');
    cell.classList.add('cell', 'cell-invisible');
    board.appendChild(cell);
    for (let i = 'A'.charCodeAt(0); i <= 'J'.charCodeAt(0); i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', 'cell-invisible');
      cell.textContent = String.fromCharCode(i);
      board.appendChild(cell);
    }

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', 'cell-invisible');
      cell.textContent = i + 1;
      board.appendChild(cell);

      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (grid[i][j] === 0) {
          cell.classList.add('miss');
          cell.textContent = '•';
        } else if (grid[i][j] === 1) {
          if (self) {
            cell.classList.add('ship');
            cell.textContent = '◼';
          } else {
            cell.addEventListener('click', () => {
              this.game.attackBoard(i, j);
              this.updateScreen();
            });
          }
        } else if (grid[i][j] === 2) {
          cell.classList.add('hit');
          cell.textContent = '×';
        } else if (grid[i][j] === null) {
          cell.addEventListener('click', () => {
            this.game.attackBoard(i, j);
            this.updateScreen();
          });
        }

        board.appendChild(cell);
      }
    }
  }

  updateScreen() {
    if (this.game.isRunning) {
      this.gameStatusText.textContent = ['Your turn.', "Opponent's turn."][
        this.game.turn - 1
      ];
    } else {
      if (this.game.winner === 1) {
        this.gameStatusText.textContent = 'Game over. You won!';
      } else if (this.game.winner === 2) {
        this.gameStatusText.textContent = 'Game over. You lost!';
      } else {
        this.gameStatusText.textContent = 'Press Play to start a new game.';
      }
    }

    this.displayBoard(this.player1Board, this.game.player1.gameboard.grid);
    this.displayBoard(
      this.player2Board,
      this.game.player2.gameboard.grid,
      false
    );

    this.player1RemainingShips.textContent =
      this.game.player1.gameboard.getRemainingShips();
    this.player2RemainingShips.textContent =
      this.game.player2.gameboard.getRemainingShips();

    if (this.game.isRunning) {
      this.playButton.classList.add('restart');
      this.playButton.classList.remove('play');
      this.playButton.textContent = 'Restart 🔄';
      this.randomizeButton.disabled = true;
    } else {
      this.playButton.classList.add('play');
      this.playButton.classList.remove('restart');
      this.playButton.textContent = 'Play ▶';
      this.randomizeButton.disabled = false;
    }
  }
}

export default DOMManager;
