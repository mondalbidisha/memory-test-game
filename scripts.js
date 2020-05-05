const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function changeView() {
  let frontView = document.querySelector('.front-page-card');
  frontView.style.display = 'none';
  let memoryGame = document.querySelector('.memory-game');
  memoryGame.style.display = 'flex'
}

function flipCard() {
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch) {
    disableCards();
  } else {
    unflipCards();
  } 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  // let count = 0;
  // cards.forEach(card => {
  //   if(card.classList.contains("flip")) {
  //     count = count + 1;
  //   }
  // })
  // if(count.length === cards.length) {

  // }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
button.addEventListener('click', changeView);