// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Just a result counter, no option to stop based on result
// Logic around Ace is to add 11 if sum below 21 otherwise 1
// Not DRY - repetion in if statement 'result' and switch refactored a bit
// To be rewritten in construcor function, prototype methods or some JS pattern

var Game = function(name) {
  this.result = 0;
  this.name = name;
} 

// // Caching buttons and setting their status to active
var hitButton = document.querySelector(".js-hit");
var stickButton = document.querySelector(".js-stick");
// var newButton = document.querySelector(".js-newgame");

// Arrays of card types
var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var colours = ['S', 'C', 'H', 'D']; // Spades, Clubs, Hearts, Diamonds
var deck = [];
getDeck(cards, colours);
console.log(deck);


// Dealer and Player initiated
var dealer = new Game('Dealer');
var player = new Game('Player');

Game.prototype.hit = function(deck) {
  var card = deck.pop();
  var dealtCard = checkValueOf(card);

  // Gives 1 point instead of 11 if dealt card was 11 and result is already bigger than 10
  if(dealtCard === 11 && this.result > 10) { dealtCard = 1 };
  this.result = this.result + dealtCard;

  if(this.result < 21) {
    console.log(this.name + ' got ' + this.result + ' points in total'); // to be removed
  } else if(this.result === 21) {
    console.log(this.name + ' got ' + this.result + ' WINNER!'); // to be removed
    stickButton.disabled = true;
    hitButton.disabled = true;
  } else {
    console.log(this.name + ' got ' + this.result + ' points, this is over 21, LOSER!'); // to be removed
    stickButton.disabled = true;
    hitButton.disabled = true;
  }

}

// player.hit(deck); 
// dealer.hit(deck);
// player.hit(deck); 

// // // //newGameAction();

function hitAction() {
  player.hit();
}

function stickAction() {
  dealer.hit();
}

// // Event listeners, binding buttons
hitButton.addEventListener('click', hitAction, false); 
stickButton.addEventListener('click', stickAction, false); 
// // // newButton.addEventListener('click', newAction, false); 


// function newAction() {
//   // player.result = 0;
//   // dealer.result = 0;
//   // stickButton.disabled = false;
//   // hitButton.disabled = false;

//   // // Initialize a deck of cards
//   // getDeck(cards, colours);
//   // // Shuffle cards
//   // shuffleCards(deck);

//   // //Game initialization
//   // player.hit(deck);
//   // dealer.hit(deck);
//   // player.hit(deck);
//   console.log('TESTING 123');
// }

// Return deck of cards based on cards and colours array
function getDeck(cards, colours) {
  
  cards.forEach(function(card) {
    
    colours.forEach(function(colour) {
      deck.push(colour.toString() + card.toString());
    });
  
  });    

}

// Shuffling cards in the array of cards provided
function shuffleCards(cards) {

  var j, x, i;
  for (i = cards.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = cards[i - 1];
    cards[i - 1] = cards[j];
    cards[j] = x;
  }

}

// Return the points value of a given card
function checkValueOf(card) {

  var el = card.slice(1);
  isNaN(el) ? el = el.toString() : el = parseInt(el);

  switch(el) {
    case 'J':
    case 'K':
    case 'Q':
      return 10;
      break;
    case 'A':
      return 11;
      break;
    default:
      return el;
  }

};

// // Initialization of the game
// getDeck(cards, colours);
// shuffleCards(deck);
// // hitButton.disabled = false;
// // stickButton.disabled = false;
// console.log(deck);
// console.log(deck.length);
// player.hit(deck);

