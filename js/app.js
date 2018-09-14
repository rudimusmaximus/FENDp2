// explore some possible global values to use
let clickIsOk, wonBoolean = false;
let openCount, matchCount, pairCount, moveCount = 0;
const totalCardsInDeck = 16;
let starCount = 3;
let lastFlipped = null;
/*
 * Create a list that holds all of your cards
 */
let allTheCardsNodeList = document.querySelectorAll('ul.deck li');
let allTheCardsArray = null;
/*
 * puts cards face down, forgets open, matches, and shuffles deck
 */
function resetTheDeck() {
  //hide, unmatch
  let i = 0;
  do {
    allTheCardsNodeList[i].classList.remove('match', 'open', 'show');
    i++;
  } while (i < totalCardsInDeck);
  //shuffle
  allTheCardsNodeList = document.querySelectorAll('ul.deck li');
  allTheCardsArray = Array.from(allTheCardsNodeList);
  let allTheCardsShuffled = shuffle(allTheCardsArray)
  let deck = document.querySelector('ul.deck');
  //remove cards on screen
  i = 0;
  do {
    deck.removeChild(allTheCardsNodeList[i]);
    i++;
  } while (i < totalCardsInDeck);

  //replace cards from shuffled array
  i = 0;
  do {
    deck.appendChild(allTheCardsShuffled[i]);
    i++;
  } while (i < totalCardsInDeck);
  //reset counts
  matchCount = 0;
  pairCount = 0;
  openCount = 0;
  moveCount = 0;
  document.querySelector('.moves').textContent = ' ' + moveCount; //on screen
  lastFlipped = null;
  resetTheStars();
  clickIsOk = true;
  console.log('reset complete');
}
/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/*
 * increments the move counter and displays it on the page
 */
function incrementMoveCounter() {
  moveCount++;
  //update screen
  document.querySelector('.moves').textContent = ' ' + moveCount;
  if ((moveCount === 16) || (moveCount === 32)) {
    demoteStar();
  }
}
/**
 * removes one stars
 */
function demoteStar() {
  document.querySelectorAll('.stars')[0].lastElementChild.remove('.fa-star');
}
/**
 * Reset the stars to three
 */
function resetTheStars() {
  let nodeOfStars = document.querySelectorAll('.stars'); //the three given
  let arrayOfStars = Array.from(nodeOfStars);

  let howManyMakeThree = 3 - arrayOfStars[0].childElementCount;
  let i = 0;
  if (howManyMakeThree > 0) {
    do {
      arrayOfStars[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
      i++;
    } while (i < howManyMakeThree);
  } else {
    return;
  }
}
/**
 * display winning message with final score
 */
function youWonMessenger() {
  clickIsOk = false;
  console.log('we have a winner!');
}
/**
 * uses class list of childElement to match images
 * returns Boolean whether matched
 */
function gotAMatch(lastFlipped, card) {
  //if (document.querySelectorAll('li.card.open.show:not(.match)').length < 2) {
  if (openCount < 2) {
    return false;
    //  } else if ((document.querySelectorAll('li.card.open.show:not(.match)').length === 2) &&
  } else if ((openCount === 2) &&
    (card.firstElementChild.classList[1] === lastFlipped.firstElementChild.classList[1])) {
    return true;
  }
  return false;
}
/**
 * setup click logic counts pairs and matches using a last flipped approach
 * clickOk boolean used to prevent over clicking
 * counts determine winner
 * manipulates class to show and hide cards
 */
document.querySelectorAll('li.card').forEach(function(card) {
  card.addEventListener('click', function() {
    if ((clickIsOk) && (openCount < 2)) {
      console.log('card clicked');
      if (card.classList.contains('match')) {
        console.log('already matched')
        return;
      } else if (card.classList.contains('open')) {
        console.log('already opened')
        return;
      } else {
        card.classList.add('open', 'show');
        openCount++;
        incrementMoveCounter();
      }
      if (lastFlipped) {
        if (gotAMatch(lastFlipped, card)) {
          console.log('we have a match');
          //take both and make them a match
          card.classList.add('match');
          matchCount++;
          card.classList.remove('open');
          openCount--;
          lastFlipped.classList.add('match');
          matchCount++;
          lastFlipped.classList.remove('open');
          openCount--;
          lastFlipped = null;
          pairCount++;
          if ((pairCount === 8) && (matchCount === 16)) {
            //if (matchCount === 16) {
            wonBoolean = true;
            youWonMessenger();
          }
        } else if (openCount === 2) { //not a match and two open cards showing
          clickIsOk = false;
          setTimeout(function onTimeout() {
            document.querySelectorAll('li.card.open.show:not(.match)').forEach(function(card) {
              card.classList.remove('open', 'show');
              openCount = 0;
              lastFlipped = null;
            })
          }, 700);
          clickIsOk = true;
        }
        lastFlipped = card;
      } else { //first card flip
        lastFlipped = card;
      }
    } else { //end if clickIsOk
      return;
    }
  }); //end addEventListener
}); //end querySelectorAll
/**
 * enable reset on click of reset icon and reset text
 */
document.querySelector('i.fa-repeat').addEventListener('click', function() {
  resetTheDeck()
});
document.querySelector('.restart-text').addEventListener('click', function() {
  resetTheDeck()
});
