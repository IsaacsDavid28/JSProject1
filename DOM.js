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

function flipCard (e){
  //this function is repalcing what we had in lines 77-107. Utilizing the data-id's
  //start the game with the first card not having a value, undefined
  e.preventDefault()
  console.log(e.target)
  console.log(e.currentTarget)
  if(e.currentTarget.getAttribute("data-matched") === "true"){
    return; 
  }
  else if(firstCard === undefined){
    firstCard = e.currentTarget;
    firstCard.classList.toggle("flipCard"); 
  }
  //have picked a card that was flipped over and the card I'm currently picking has not been macthed. 
  else {
    secondCard = e.currentTarget;
    secondCard.classList.toggle("flipCard");
    let firstCardId = firstCard.getAttribute("data-id");
    let secondCardId = secondCard.getAttribute("data-id");
    console.log(firstCard.id);
    console.log(secondCard.id);
    if(firstCard.id === secondCard.id){
      console.log("clicked the same card");
      secondCard.classList.toggle("flipCard");
      firstCard = undefined; 
      secondCard = undefined; 
      return;
    }
    else if(secondCardId === firstCardId){
      console.log("cards matched");
      firstCard.setAttribute("data-matched", "true");
      secondCard.setAttribute("data-matched", "true");
      firstCard = undefined;
      secondCard = undefined; 
    }
    else{
      console.log("cards did not match")
      firstCard.classList.toggle("flipCard");
      secondCard.classList.toggle("flipCard");
      firstCard = undefined;
      secondCard = undefined; 
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
