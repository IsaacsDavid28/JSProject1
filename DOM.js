"use strict";

//selectors
const cards = document.querySelectorAll('.cards')

let firstCardId = 0;

let matchedCardIds = [];

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard)
}

// document.form_main.start.onclick = () => begin();
 document.form_main.reset.onclick = () => reset();

function begin() {
  cron = setInterval(() => { timer(); }, 10);
}

begin();

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
  randomize();
  begin();
  firstCardId = 0;
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

function randomize() {
  cards.forEach(c => {
    let r = Math.floor(Math.random() * 16);
    c.style.order = r;
    c.classList.remove('flipCard')
})
}


randomize();

function flipCard (e){
  e.preventDefault()
  
  let currentCardId = e.currentTarget.id;
  
  if(!matchedCardIds.includes(currentCardId)){
    if(firstCardId === 0){
      console.log('first time flipping card')
      e.currentTarget.classList.toggle('flipCard');
      firstCardId = e.currentTarget.id;
    }
    else if(e.currentTarget.id == firstCardId){
      console.log('Clicked the same card twice');
      e.currentTarget.classList.toggle('flipCard');
      firstCardId = 0;
    }
    else{

      let firstCard = document.getElementById(firstCardId);
      let secondCard = document.getElementById(e.currentTarget.id);

      let firstCardPartnerId =  firstCard.getAttribute("data-partnerId");
      let secondPartnerId = secondCard.getAttribute("data-partnerId");

      secondCard.classList.toggle('flipCard');

      //you have to force javascript to wait so that it actually shows the flip animation
      setTimeout(function(){
        if(firstCardPartnerId === secondPartnerId){
          console.log('We have a match!')
          matchedCardIds.push(firstCard.id);
          matchedCardIds.push(secondCard.id);
          firstCardId = 0;
          console.log(matchedCardIds);
          if (matchedCardIds.length === 16) {
            stop();
            matchedCardIds.length = 0
            alert(`Congratulations!! Can you beat your score? Try again`)
          
        }}
        else{
          console.log('Not a match sorry!');
          firstCard.classList.toggle('flipCard');
          secondCard.classList.toggle('flipCard');
          firstCardId = 0;
        }
      }, 1000);       
      } 
    }
  }

function flipCardDisplay(target){
  target.classList.toggle('flipCard');
}

function resume() {
  firstCard.classList.toggle('flipCard');
  secondCard.classList.toggle('flipCard');
}



