const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const popup = document.querySelector('.popup');
const gameOverScreen = document.querySelector('.game-over');

let loop;
let gameStarted = false;

const jump = () => {
  if (gameStarted && !mario.classList.contains('jump')) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};

const startGame = () => {
  gameStarted = true;
  popup.style.display = 'none';
  loop = setInterval(() => {
    console.log('loop');
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = 'images/game-over.png';
      mario.style.width = '75px';
      mario.style.marginLeft = '50px';

      clearInterval(loop);
      gameStarted = false;
      showGameOverScreen();
    }
  }, 10);
};

const showGameOverScreen = () => {
  gameOverScreen.style.display = 'block';
};

const restartGame = () => {
  gameOverScreen.style.display = 'none';
  mario.src = 'images/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0';
  pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  clearInterval(loop); // Interromper o loop anterior
  location.reload(); // Recarregar a página
};

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
document.addEventListener('keydown', jump);
