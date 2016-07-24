// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Logic around Ace is to add 11 if sum below 21 otherwise 1

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var colours = ['S', 'C', 'H', 'D']; // Spades, Clubs, Hearts, Diamonds
var deck = [];
var result = 0;
var hitButton = document.querySelector(".js-hit");
var stickButton = document.querySelector(".js-stick");
var resetButton = document.querySelector(".js-reset");
var textEl = document.querySelector(".js-msg");

var Game = function(name) {
  this.result = 0;
  this.name = name;
}

// Initialization of two players
var player = new Game('Player');
var dealer = new Game('Dealer');

// Get the last card from deck and remove that card from deck 
Game.prototype.hit = function(deck) {

  var card = deck.pop();
  var dealtCard = checkValueOf(card);

  if(dealtCard === 11 && this.result > 10 ) { dealtCard = 1; }
  this.result = this.result + dealtCard;

  if(this.result < 21) {
    textEl.innerHTML = (this.name + ' got ' + this.result + ' points in total'); 
    console.log(this.name + ' got ' + this.result + ' points in total'); // to be removed
  } else if(this.result === 21) {
      textEl.innerHTML = (this.name + ' got ' + this.result + ' a Blackjack!!');
      console.log(this.name + ' got ' + this.result + ' a Blackjack!!'); // to be removed
      disableButtons();
  } else {
      textEl.innerHTML = (this.name + ' got ' + this.result + ' points ...GAME OVER!!');
      console.log(this.name + ' got ' + this.result + ' points ...GAME OVER!!'); // to be removed
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
function shuffleCards(cards) {

  var j, x, i;
  for (i = cards.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = cards[i - 1];
    cards[i - 1] = cards[j];
    cards[j] = x;
  }

}


function hitAction() {
  // An attempt to create automated dealer after reaching 17 points
  // player.hit(deck);
  // if(dealer.result > 17) {
    player.hit(deck);
  // }
};

function stickAction() {
  // An attempt to create automated dealer after reaching 17 points
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
    console.log('PLAYER wins');
  } else if(player.result < dealer.result) {
    console.log('DEALER wins');
  } else {
    console.log('DRAW!');
  }
};

function resetAction() {
  dealer.result = 0;
  player.result = 0;
  hitButton.disabled = false;
  stickButton.disabled = false;
  deck = [];
  startGame();
};


function startGame() {
  getDeck(cards, colours);
  shuffleCards(deck);
  
  //Deal 2 cards to the Player and one to the Dealer
  player.hit(deck);
  dealer.hit(deck);
  player.hit(deck); 
}


// Event listeners for Hit, Stick and Reset buttons
hitButton.addEventListener('click', hitAction, false);
stickButton.addEventListener('click', stickAction, false);
resetButton.addEventListener('click', resetAction, false);