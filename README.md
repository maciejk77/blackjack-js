#Blackjack game in JavaScript

The purpose of this exercise is to create blackjack game engine in vanilla JavaScript.

##The Blackjack game requirements and rules

Blackjack is a game of cards using a standard deck of cards of 4 suits (Hearts, Diamonds, Clubs and Spades), each of which has the following cards (2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace), and a Deck of cards consists of one of each combination (2 of Hearts, 2 of Diamonds, 2 of Clubs, etc).

In the game Blackjack, the cards have the following values:

- 2 to 10: The value of the card number.
- Jack, Queen and King: 10.
- Ace: 1 or 11 (whichever gives the closest score to 21 without busting)

The object of the game is to beat the dealer, which can be done in a number of ways:

- Get 21 points on the player's first two cards (called a blackjack), without a dealer blackjack;
- Reach a final score higher than the dealer without exceeding 21; or
- Let the dealer draw additional cards until his or her hand exceeds 21.
- The dealer must hit until his or her cards total 17 or more points. 
- Players win if they do not bust and have a total that is higher than the dealer's.
- The dealer loses if he or she busts or has a lesser hand than the player who has not busted.
- If the player and dealer have the same total, this is called a "push", this is classed as a draw.

##Clicking New Game, should

- Reset from any previous game
- Shuffle the Deck of 52 cards
- Deal 1 card to the Player
- Deal 1 card to the Dealer
- Deal another card to the Player
- The Player can then Hit, in which another card is dealt. 
- The Player can choose to Hit until he decides to Stick or he goes Bust (greater than 21)
- The Player can Stick, in which his turn is over
- Now the Dealer's turn, the Computer deals automatically until the Dealer reaches 17 or greater, or is Bust (greater than 21)
- On conclusion of the Dealer's turn, or the Player going Bust, a banner of the outcome is shown (the Player Wins, Loses or Draws)

##Instruction

- Clone this repo ```git clone``` and check into the folder 
- Run ```open index.html``` for Mac or ```start index.html``` for Win to see JS app

###To be done

- to display card from img/cards.png as they are dealt by computer

####Preview

![sass-js-coding-test screenshot](https://github.com/maciejk77/blackjack-js/blob/master/img/screenshot.png?raw=true)