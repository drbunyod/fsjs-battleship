import DOMManager from './dom';
import GameManager from './game';
import './index.css';

const game = new GameManager('computer');
const dom = new DOMManager(game);
dom.updateScreen();

const gameRunner = () => {
  if (!game.isRunning && game.winner !== null) {
    return;
  }

  if (game.player2.type === 'computer' && game.turn === 2) {
    game.computerAttack();
    dom.updateScreen();
  }

  requestAnimationFrame(gameRunner);
};

requestAnimationFrame(gameRunner);
