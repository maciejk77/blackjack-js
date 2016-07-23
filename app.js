// Basic game engine
// Assumptions: 
// 1 player, 1 deck of cards
// Just a result counter, no option to stop based on result
// Logic around Ace is to add 11 if sum below 21 otherwise 1
// Not DRY - repetion in if statement 'result' and switch refactored a bit
// To be rewritten in construcor function, prototype methods or some JS pattern

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var deck = [];
var result = 0;
var playerCards = getDeckOf(cards);

// quick fix to add 3 more suits, a deck in total
function getDeckOf(cards) {
  cards.forEach(function (card) {
    for(var i = 0; i < 4; i++) {
      deck.push(card); 
    }
  });
  shuffle(deck);
  return deck;  
}

function shuffle(cards) {

  var j, x, i;
  for (i = cards.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = cards[i - 1];
      cards[i - 1] = cards[j];
      cards[j] = x;
  }

}

function deal(deck) {

  var card = deck.pop();
  var dealtCard = check(card);

  result += dealtCard;

  if(result < 21) {
    console.log(result + ' is the current result');
  } else if(result === 21) {
    console.log(result + ' is the Blackjack!');
  } else {
    console.log(result + ' ...This is over 21 !!');
  }

}

function check(card) {
  
  switch(card) {
    case 'J':
    case 'K':
    case 'Q':
        return 10;
        break;
    case 'A':
        return result + 11 < 21 ? 11 : 1;
        break;
    default:
        return card;
  }

};

