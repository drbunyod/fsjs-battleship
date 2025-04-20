import DOMManager from './dom';
import GameManager from './game';
import './index.css';

const game = new GameManager('computer');
const dom = new DOMManager(game);
dom.updateScreen();

let lastTime = performance.now();
const delay = 1000;

const gameRunner = (currentTime) => {
  if (!game.isRunning && game.winner !== null) {
    return;
  }

  const elapsedTime = currentTime - lastTime;
  if (elapsedTime >= delay) {
    if (game.player2.type === 'computer' && game.turn === 2) {
      game.computerAttack();
      dom.updateScreen();
    }
    lastTime = currentTime;
  }

  requestAnimationFrame(gameRunner);
};

requestAnimationFrame(gameRunner);
