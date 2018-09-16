// explore some possible global values to use
let clickIsOk, wonBoolean, timerIsRunning = false;
let openCount, matchCount, pairCount, moveCount = 0;
const totalCardsInDeck = 16;
let starCount = 3;
let lastFlipped = null;
let intervalId = null;
let duration = 0;
/**
 * @description Starts an interval timer
 */
function startTimer() {
  let minutes = 0;
  let seconds = 0;
  duration = 0;
  updateScreenTimer(minutes, seconds);
  intervalId = setInterval(() => {
    duration++;
    minutes = Math.floor(duration / 60);
    seconds = duration % 60;
    updateScreenTimer(minutes, seconds);
  }, 1000);
  timerIsRunning = true;
  return;
}
/**
 * @description Updates the on screen timer takes minutes and seconds
 * to update the displayed duration
 */
function updateScreenTimer(min, sec) {
  const timer = document.querySelector('.duration');
  if (sec < 10) {
    timer.innerHTML = min + ':0' + sec;
  } else {
    timer.innerHTML = min + ':' + sec;
  }
  return;
}
/*
 * Create a list that holds all of your cards
 */
let allTheCardsNodeList = document.querySelectorAll('ul.deck li');
let allTheCardsArray = null;
/*
 * @description Puts cards face down, forgets open, matches, and shuffles deck
 */
function resetTheGame() {
  if (timerIsRunning) {
    clearInterval(intervalId);
  }
  if (wonBoolean) {
    wonBoolean = false;
  }
  //if showing win modal, hide it
  if (!document.querySelector('.modal__background').classList.contains('hide')) {
    toggleModal();
  }
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
  startTimer();
  return;
} //end resetTheGame
/**
 * @description Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  let currentIndex = array.length,
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
/**
 * @description Increments the move counter and displays it on the page
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
 * @description Removes one star
 */
function demoteStar() {
  starCount--;
  document.querySelectorAll('.stars')[0].lastElementChild.remove('.fa-star');
}
/**
 * @description Resets the stars to three
 */
function resetTheStars() {
  starCount = 3;
  let nodeOfStars = document.querySelectorAll('.stars'); //the three given
  let howManyMakeThree = 3 - nodeOfStars[0].childElementCount;
  let i = 0;
  if (howManyMakeThree > 0) {
    do {
      nodeOfStars[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
      i++;
    } while (i < howManyMakeThree);
  } else {
    return;
  }
}
/**
 * @description Displays winning message with final score
 */
function youWonMessenger() {
  clickIsOk = false;

  if (timerIsRunning) {
    clearInterval(intervalId);
  }

  document.querySelector('.modal__time').textContent =
    ('Time = ' + document.querySelector('.duration').textContent + ' m:s');
  document.querySelector('.modal__stars').textContent =
    ('Stars = ' + document.querySelectorAll('.stars')[0].childElementCount);
  document.querySelector('.modal__moves').textContent = 'Moves = ' + moveCount;
  if (document.querySelector('.modal__background').classList.contains('hide')) {
    toggleModal();
  }
}
/**
 * @description Shows or hides the win stats modal
 */
function toggleModal() {
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}
/**
 * @description Uses class list of childElement to match images
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
/*
 * Setup click logic counts pairs and matches using a last flipped approach
 * clickOk boolean used to prevent over clicking
 * counts determine winner
 * manipulates class to show and hide cards
 */
document.querySelectorAll('li.card').forEach(function(card) {
  card.addEventListener('click', function() {
    if ((clickIsOk) && (openCount < 2)) {
      if (card.classList.contains('match')) {
        return;
      } else if (card.classList.contains('open')) {
        return;
      } else {
        card.classList.add('open', 'show');
        openCount++;
        incrementMoveCounter();
      }
      if (lastFlipped) {
        if (gotAMatch(lastFlipped, card)) {
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
/*
 * enables reset on click of reset icon and reset text
 */
document.querySelector('i.fa-repeat').addEventListener('click', function() {
  resetTheGame()
});
document.querySelector('.restart-text').addEventListener('click', function() {
  resetTheGame()
});
/*
 * enable the click events for the win modal
 */
document.querySelector('.modal__close').addEventListener('click', function() {
  toggleModal();
});
document.querySelector('.modal__cancel').addEventListener('click', function() {
  toggleModal();
});
document.querySelector('.modal__replay').addEventListener('click', function() {
  resetTheGame();
});
