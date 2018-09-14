// explore some possible global values to use
let matchCount = 0;
let pairCount = 0;
const totalCardsInDeck = 16;
let unmatchedCandidateCount = 1;
let starCount = 3;
let currentElement = null;
let lastFlipped = null;
let openCount = 0;
let wonBoolean = false;
let clickIsOk = true;
/*
 * Create a list that holds all of your cards
 */
let allTheCardsNodeList = document.querySelectorAll('ul.deck li');
let allTheCardsArray = Array.from(allTheCardsNodeList);

/*
 * exploring how
 */
function showAll() {
  let x = 0;
  do {
    allTheCardsNodeList[x].classList.add('show');
    x++;
  } while (x < totalCardsInDeck);
  console.log('show all');
}
/*
 * exploring how
 */
function hideAll() {
  let y = 0;
  do {
    allTheCardsNodeList[y].classList.remove('show');
    y++;
  } while (y < totalCardsInDeck);
  console.log('hide all');
}

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

  console.log('reset complete');
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.querySelectorAll('li.card').forEach(function(card) {
  card.addEventListener('click', function() {
    if ((clickIsOk) && (openCount < 2)) {
      console.log('card clicked');
      if (card.classList.contains('match')) {
        console.log('already matched')
      } else if (card.classList.contains('open')) {
        console.log('already opened')
      } else {
          card.classList.add('open', 'show');
          openCount++;
        }
      if (lastFlipped) {
        if (gotAMatch(lastFlipped, card)) {
          console.log('we have a match');
          //take both and make them a match
          document.querySelectorAll('li.card.open.show').forEach(function(card) {
            card.classList.add('match');
            card.classList.remove('open');
            matchCount++;
            openCount = 0;
            lastFlipped = null;
            pairCount++;
            if ((pairCount === 8) && (matchCount === 16)) {
              wonBoolean = true;
              console.log('we have a winner!');
            }
          })
        } else if (openCount === 2) { //not a match and two open cards showing
          clickIsOk = false;
          setTimeout(function onTimeout() {
            document.querySelectorAll('li.card.open.show:not(.match)').forEach(function(card) {
              card.classList.remove('open', 'show');
              openCount = 0;
              lastFlipped = null;
            })
          }, 1000);
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
/////TODO: placeholder draft code to remove...wip
// function clickLogic(card) {
//   console.log('card clicked');
//   if (card.classList.contains('match')) {
//     console.log('already matched')
//   } else if (card.classList.contains('open')) {
//     console.log('already opened')
//   } else {
//     card.classList.add('open');
//   }
//   if (lastFlipped) {
//     //            gotAMatch(lastFlipped,card);
//     console.log('check for match and add match class to if we do');
//     lastFlipped = card;
//   } else {
//     lastFlipped = card;
//   }
// }

// function makeCardsFlipAble() {
//   document.querySelectorAll('li.card').forEach(function(card) {
//     card.addEventListener('click', function(){
//       console.log('card clicked');
//       if (card.classList.contains('match')) {
//         console.log('already matched')
//       } else if (card.classList.contains('open')) {
//         console.log('already opened')
//       } else {
//         card.classList.add('open');
//       }
//       if (lastFlipped) {
//         //            gotAMatch(lastFlipped,card);
//         console.log('check for match and add match class to if we do');
//         lastFlipped = card;
//       } else {
//         lastFlipped = card;
//       }
//     });
//   };
// }
// enable reset on click of reset icon
document.querySelector('i.fa-repeat').addEventListener('click', function() {
  resetTheDeck()
});
