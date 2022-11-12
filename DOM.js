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

//Flip function//

const card = document.querySelector(".card-1");

card.addEventListener('click', flipCard);

function flipCard() {
  card.classList.toggle("flipCard")
  
}

const board = document.querySelectorAll('.cards')

const startButton = document.querySelector('#start')

const startGame = document.addEventListener('click', randomize);

const resetButton = document.querySelector('#reset')

const resetGame = document.addEventListener('click', resetRandomize);

function randomize() {
  board.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
})
}

function resetRandomize() {
  board.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
})
}
