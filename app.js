// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Just a result counter, no option to stop based on result
// Logic around Ace is to add 11 if sum below 21 otherwise 1
// Not DRY - repetion in if statement 'result' and switch refactored a bit
// To be rewritten in construcor function, prototype methods or some JS pattern

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var colours = ['S', 'C', 'H', 'D']; // Spades, Clubs, Hearts, Diamonds
var deck = [];
var result = 0;

// Initialize a deck of cards
getDeck(cards, colours);
// Shuffle cards
shuffleCards(deck);

// First to random cards dealt by the Dealer
dealACard(deck);
dealACard(deck);


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
function dealACard(deck) {

  var card = deck.pop();
  var dealtCard = checkValueOf(card);

  result += dealtCard;

  if(result < 21) {
    console.log(result + ' is the current result'); // to be removed
  } else if(result === 21) {
    console.log(result + ' is the Blackjack!');
  } else {
    console.log(result + ' ...this is over 21, GAME OVER!!'); // to be removed
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
        return result < 21 ? 11 : 1; // fixed logic for the moment
        break;
    default:
        return el;
  }

};

