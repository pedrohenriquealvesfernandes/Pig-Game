'use strict';

// Selecionando os elementos
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player = document.querySelectorAll('.player');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// INICIANDO PROJETO

//Condições de inicialização
let currentScore, activePlayer, playing, scores;

const condStart = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
condStart();

// Rolar o dado

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Gerando um número aleatório para o dado

    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Mostrar o dado

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Verificar se o valor for 1: se for, trocar de jogador

    if (dice !== 1) {
      //Valor do dado para a pontuação atual

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Mudar para o próximo jogador

      switchPlayer();
    }
  }
});

//Guardar Pontos

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Adicionando a pontuação atual para pontuação total
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Verificar se o jogador atingiu 100 ou mais pontos

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Mudar para próximo jogador
      switchPlayer();
    }
  }
});

//Reiniciar
btnNew.addEventListener('click', function () {
  condStart();
});
