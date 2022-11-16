"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

// document.form_main.start.onclick = () => begin();
 document.form_main.reset.onclick = () => reset();

function begin() {
  cron = setInterval(() => { timer(); }, 10);
}

begin()

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
  resetAllCards();
  randomize();
  begin();
}

function stop() {
  clearInterval(cron);
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

let firstCard;
let firstCardId;
let secondCard;
let secondCardId;

let matchedCards = [];
let matchedCardsIds = [];

const cards = document.querySelectorAll('.cards')
function randomize() {
  cards.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
})
}
randomize();

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard)
}

function flipCard(e) {
  if (matchedCards.length === 8) {
    return
  }
  let element = e.currentTarget;
  console.log(matchedCards);
  console.log(firstCard);
  console.log(secondCard);
  if(matchedCards.includes(element.classList[0])) {
    return
  }

  if (firstCard) {
    e.target.classList.toggle("flipCard");
    secondCard = element.classList[0]
    secondCardId = element.id;
    let cardsMatch = firstCard === secondCard
    if (cardsMatch) {
      matchedCards.push(firstCard);
      matchedCardsIds.push(firstCardId);
      matchedCardsIds.push(secondCardId);
      if(matchedCards.length === 8) {
        stop();
      }
    }
    else {
      let selectedCard1 = Array.from(cards).find(card => card.id === firstCardId);
      selectedCard1.classList.toggle("flipCard");
      let selectedCard2 = Array.from(cards).find(card => card.id === secondCardId);
      selectedCard2.classList.toggle("flipCard");
    }
    firstCard = null;
    secondCard = null;
    firstCardId = null;
    secondCardId = null;
    return
  }
    firstCard = element.classList[0]
    firstCardId = element.id;
    console.log(firstCardId);
    e.target.classList.toggle("flipCard");
}

function resetAllCards() {
  const currentCards = document.querySelectorAll('.cards')
  console.log(currentCards);
  let flippedCards = Array.from(cards).filter(card => matchedCardsIds.includes(card.id));
  for(const card of flippedCards) {
    card.classList.toggle("flipCard");
  }
  if(firstCardId && ! secondCardId) {
    let flipCard = Array.from(cards).find(card => card.id === firstCardId);
    flipCard.classList.toggle("flipCard");
  }
  
  matchedCards = [];
  matchedCardsIds = [];
}
