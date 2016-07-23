// Basic game engine
// Assumptions: 
// 1 player, 1 suit of cards
// Just a result counter, no option to stop based on result
// Logic around Ace is to add 11 if sum below 21 otherwise 1
// Not DRY - repetion in if statement 'result' and switch not the cleanest
// To be rewritten in construcor function, prototype methods or some JS pattern

var cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var result = 0;

function shuffle(cards) {

  var j, x, i;
  for (i = cards.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = cards[i - 1];
      cards[i - 1] = cards[j];
      cards[j] = x;
  }

}

function deal(cards) {

  var card = cards.pop();
  var dealtCard = check(card);

  if (result + dealtCard < 21) {
    result += dealtCard;
    console.log(result + ' is the current result');
  } else if(result + dealtCard === 21) {
    result += dealtCard;
    console.log(result + ' is the Blackjack!');
  } else {
    console.log('This is over 21 !!');
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

