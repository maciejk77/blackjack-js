// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Logic around Ace is to add 11 if sum below 21 otherwise 1

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var colours = ['S', 'C', 'H', 'D']; // Spades, Clubs, Hearts, Diamonds
var deck = [];
var result = 0;
var hitButton = document.querySelector('.js-hit');
var stickButton = document.querySelector('.js-stick');
var resetButton = document.querySelector('.js-reset');
var textEl = document.querySelector('.js-msg');
var winnerEl = document.querySelector('.js-display');

var Game = function(name) {
  this.result = 0;
  this.name = name;
}

// Initialization of two players
var player = new Game('PLAYER');
var dealer = new Game('DEALER');

// Get the last card from deck and remove that card from deck 
Game.prototype.hit = function(deck) {

  var card = deck.pop();
  var dealtCard = checkValueOf(card);

  if(dealtCard === 11 && this.result > 10 ) { dealtCard = 1; }
  this.result = this.result + dealtCard;

  if(this.result < 21) {
    textEl.innerHTML = (this.name + '\'s last card is (' + card + ') - ' + this.result + ' points in total'); 
    console.log(this.name + ' got (' + card + ') - ' + this.result + ' points in total'); // to be removed

  } else if(this.result === 21) {
      textEl.innerHTML = (this.name + ' got ' + this.result + ' points, a Blackjack!!');
      console.log(this.name + ' got ' + this.result + ' a Blackjack!!'); // to be removed
      this.name === 'PLAYER' ? winnerEl.innerHTML = this.name + ' WINS' : winnerEl.innerHTML = this.name + ' LOSES';
      this.name === 'PLAYER' ? winnerEl.classList.add('alert-success') : winnerEl.classList.add('alert-danger');
      disableButtons();

  } else {
      textEl.innerHTML = (this.name + ' got ' + this.result + ' points, BUST!');
      console.log(this.name + ' got ' + this.result + ' points, BUST!'); // to be removed
      disableButtons();
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

function disableButtons() {
  hitButton.disabled = true;
  stickButton.disabled = true;
}

// Return deck of cards based on cards and colours array
function getDeck(cards, colours) {
  cards.forEach(function(card) {
    colours.forEach(function(colour) {
      deck.push(colour.toString() + card.toString());
    });
  });    
}

// Shuffling cards in the array of cards provided
function shuffle(cards) {

  var j, x, i;
  for (i = cards.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = cards[i - 1];
    cards[i - 1] = cards[j];
    cards[j] = x;
  }

}

function hitAction() {
  if(player.result <= 21) {
    player.hit(deck);
    player.result >= 21 ? getWinner() : console.log('--- Player still in the game, ' + player.result + ' points ----'); 
  }   
};

function stickAction() {
  disableButtons();
  while(dealer.result <= 17) {
    dealer.hit(deck);
  }
  getWinner();
};

function getWinner() {
  player.result > 21 ? player.result = 0 : player.result;
  dealer.result > 21 ? dealer.result = 0 : dealer.result;
  
  if(player.result > dealer.result) {
    winnerEl.innerHTML = 'PLAYER WINS';
    winnerEl.classList.add('alert-success');
    console.log('WIN');

  } else if(player.result < dealer.result) {
    winnerEl.innerHTML = 'PLAYER LOSES';
    winnerEl.classList.add('alert-danger');
    console.log('LOSS');

  } else {
    winnerEl.innerHTML = 'DRAW';
    winnerEl.classList.add('alert-info');
    console.log('DRAW');
  }
};

function resetAction() {
  dealer.result = 0;
  player.result = 0;
  hitButton.disabled = false;
  stickButton.disabled = false;
  deck = [];
  winnerEl.innerHTML = '';

  var btpClasses = ['alert-success', 'alert-info', 'alert-danger'];
  btpClasses.forEach(function(btpClass) {  
    winnerEl.classList.remove(btpClass);
  });
  
  startGame();
};

function startGame() {
  // Get a deck of cards, shuffle and deal 2 cards to the Player and one to the Dealer
  getDeck(cards, colours);
  shuffle(deck);
  player.hit(deck);
  dealer.hit(deck);
  player.hit(deck); 
}

// Event listeners for Hit, Stick and Reset buttons
hitButton.addEventListener('click', hitAction, false);
stickButton.addEventListener('click', stickAction, false);
resetButton.addEventListener('click', resetAction, false);