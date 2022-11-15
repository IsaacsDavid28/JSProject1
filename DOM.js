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

//It's going to be hard of keeping track of all the cards like this.
//Maybe object oriented programming might help!
//Think of a card as an object. What properties would it have?
let firstCard;
let secondCard;
let correct = true;
let counter = 1;

const cards = document.querySelectorAll('.cards')

//Event bubbling might be a good idea here so that way you just add a listener to the parent object, and all the cards
//will bubble the event up when clicked
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard)
}

//I am not following the logic here. I flip a card. What determines if correct (on line 73) is true? 
//Think through it this way:
//I click a card. If it's my first time, I can mark that I've clicked a certain card by holding it in a variable
//I click another card. The variable has a value, it means I've clicked a card before. I can compare the two cards to see if some criterion is the same
//Then I could set correct to true or false.
function flipCard(e) {
  if (correct = true) {
    let element = e.currentTarget;
    console.log(element)
    e.target.classList.toggle("flipCard");

      if (counter === 1) {
        firstCard = element
        counter = 2;
} 

else if (counter === 2) {
  secondCard = element
  console.log(secondCard)
  let card1 = firstCard.className
  console.log(card1)
  let card2 = secondCard.className
  console.log(card2)

  //I think flipping a card and making it 'unclickable' should be it's own function, so that way you
  //don't have to write this out for all combinations
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

//This is cool
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
