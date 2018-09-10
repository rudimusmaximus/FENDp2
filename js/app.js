// explore some possible global values to use
let matchCount = 1;
const totalCardsInDeck = 16;
let unmatchedCandidateCount = 1;
let starCount = 3;
let currentElement = null;
let lastFlipped = null;

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

//make cards click able
// works but we don't count number of live/open cards
//
document.querySelectorAll('li.card').forEach(function(card) {
  card.addEventListener('click', function() {
    console.log('card clicked');
    if (card.classList.contains('match')) {
      console.log('already matched')
    } else if (card.classList.contains('open')) {
      console.log('already opened')
    } else {
      card.classList.add('open');
    }
    if (lastFlipped) {
      if(gotAMatch(lastFlipped, card)){
        console.log('we have a match logic needed');
        //TODO: placeholder remove open add match class
      } else {
        //TODO: placeholder
        console.log('placeholder logic always says not a match');
      };
      lastFlipped = card;
    } else {//first card flip
      lastFlipped = card;
    }
  });
});

function gotAMatch(lastFlipped, card) {
  return false; //TODO: placeholder
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
document.querySelector('i.fa-repeat').addEventListener('click',function(){resetTheDeck()});
