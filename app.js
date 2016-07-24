// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Logic around Ace is to add 11 if sum below 21 otherwise 1

var Game = function(name) {
  this.result = 0;
  this.name = name;
}

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var colours = ['S', 'C', 'H', 'D']; // Spades, Clubs, Hearts, Diamonds
var deck = [];
var result = 0;
var hitButton = document.querySelector(".js-hit");
var stickButton = document.querySelector(".js-stick");
//var resetButton = document.querySelector(".js-reset");


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

// Get the last card from deck and remove that card from deck 
Game.prototype.hit = function(deck) {

  var card = deck.pop();
  var dealtCard = checkValueOf(card);

  if(dealtCard === 11 && this.result > 10 ) { dealtCard = 1; }
  this.result = this.result + dealtCard;

  if(this.result < 21) {
    console.log(this.name + ' got ' + this.result + ' points in total'); // to be removed
  } else if(this.result === 21) {
    console.log(this.name + ' got ' + this.result + ' a Blackjack!!');
    hitButton.disabled = true;
    stickButton.disabled = true;
  } else {
    console.log(this.name + ' got ' + this.result + ' points, that is GAME OVER!!'); // to be removed
    hitButton.disabled = true;
    stickButton.disabled = true;
  }

}

var player = new Game('Player');
var dealer = new Game('Dealer');

function startGame() {
  // Initialize a deck of cards
  getDeck(cards, colours);
  // Shuffle cards
  shuffleCards(deck);
  
  player.hit(deck);
  dealer.hit(deck);
  player.hit(deck); 
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
        return 11; // fixed logic for the moment
        break;
    default:
        return el;
  }

};

startGame();

function hitAction() {
  player.hit(deck);
};

function stickAction() {
  dealer.hit(deck);
};

// function newgameAction() {
//   dealer.result = 0;
//   player.result = 0;
//   hitButton.disabled = false;
//   stickButton.disabled = false;
//   startGame();
// };

hitButton.addEventListener('click', hitAction, false);
stickButton.addEventListener('click', stickAction, false);
// resetButton.addEventListener('click', reset, false);

