"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => begin();
document.form_main.reset.onclick = () => reset();

function begin() {
  cron = setInterval(() => { timer(); }, 10);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
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
let secondCard;
let correct = true;
let counter = 1;

const cards = document.querySelectorAll('.cards')

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard)
}

function flipCard(e) {
  if (correct = true) {
    let element = e.currentTarget;
    e.target.classList.toggle("flipCard");

      if (counter === 1) {
        firstCard = element
        counter = 2;
} 

else if (counter === 2) {
  secondCard = element

  let card1 = firstCard.className

  let card2 = secondCard.className

  let card3 = firstCard.style.order

  let card4 = secondCard.style.order
console.log(card3)
console.log(card4)
  if (card1 === card2) {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
  }


  else {
    correct = false;
    setTimeout(resume, 1000);
  }
  counter = 1;
}
  }
}

function resume() {
  firstCard.classList.toggle('flipCard');
  secondCard.classList.toggle('flipCard');
}


const startButton = document.querySelector('#start')

const startGame = startButton.addEventListener('click', randomize,{once:true});

const resetButton = document.querySelector('#reset')

const resetGame = resetButton.addEventListener('click', resetRandomize);

function randomize() {
  cards.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
})
}

function resetRandomize() {
  cards.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
})
}
