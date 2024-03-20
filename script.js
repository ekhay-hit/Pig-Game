'use strict';
// declairing varaibles
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// selecting elements
// element to change background of active player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// to manipulate the player scor container
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// to manipulate the dice
const diceEl = document.querySelector('.dice');
// to manipulate the current score for the player
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//to manipulate the score of the player
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//const holdEl = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const randomNumber = function () {
  return Math.floor(Math.random() * 6 + 1);
};

// intialize function
const initial = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // toggle removes the class if it is exist and add it if it not
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];

  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// implementing the function for switching player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle removes the class if it is exist and add it if it not

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// implementing hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] > 30) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Rolling dice functionality**************************
btnRoll.addEventListener('click', function () {
  if (playing) {
    //- generate a random number assign it to dice
    const dice = randomNumber();

    //-- Display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //--- check if dice not one
    if (dice !== 1) {
      currentScore += dice;
      //current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initial);
