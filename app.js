'use strict';

//regular TTT, Torus TTT, Mobius Strip, Larger square board, random blocked spots that you can't go to
const sizeOfBoard = 3;

const state = { top: {left: 'O', center: 'X', right: 'O'},
  middle: {left: 'X', center: 'O', right: 'X'},
  bottom: {left: 'O', center: 'X', right: 'X'},
  playerTurn: 'X'
};

let topMiddleBottom = ['top', 'middle', 'bottom'];

// State modification functions
function buildHtmlFromState() {
  let htmlString ='';

  for (let i = 0; i < sizeOfBoard; i++) {
    let rowString = `
    <div class="row">
      <div class="cell ${topMiddleBottom[i]}Left">
        <p class="${topMiddleBottom[i]}Left">${state[topMiddleBottom[i]]['left']}</p>
      </div>
      <div class="cell ${topMiddleBottom[i]}Center">
        <p class="${topMiddleBottom[i]}Left">${state[topMiddleBottom[i]]['center']}</p>
      </div>
      <div class="cell ${topMiddleBottom[i]}Right">
        <p class="${topMiddleBottom[i]}Left">${state[topMiddleBottom[i]]['right']}</p>
      </div>
    </div>`;
    htmlString += rowString;
  }

  return htmlString;
}

function updatePlayerTurn() {
  if (state.playerTurn === 'X') {
    state.playerTurn = 'O';
  } else {
    state.playerTurn = 'X';
  }
}

function getStateLocationFromClassName(classString) {
  let leftCenterRight = ['Left', 'Center', 'Right'];
  let location = ['', ''];
  
  for (let i = 0; i < sizeOfBoard; i++ ) {
    if (classString.includes(topMiddleBottom[i])) {
      location[0] = topMiddleBottom[i].toLowerCase();
    }
    if (classString.includes(leftCenterRight[i])) {
      location[1] = leftCenterRight[i].toLowerCase();
    }
  }
  return location;
}

function getLocationOfBoardClick(eventObject) {
  return eventObject.closest('div .cell').attr('class');
}

function updateBoardState(location) {
  state[location[0]][location[1]] = state.playerTurn;
}

function clearBoard() {
  
  for (let i = 0; i < sizeOfBoard; i++) {
    state[topMiddleBottom[i]]['left'] = '';
    state[topMiddleBottom[i]]['center'] = '';
    state[topMiddleBottom[i]]['right'] = '';
  }
}

// Render functions
function render() {
  $('.board').html(buildHtmlFromState());
}

// Event Listeners
function handleClickOnBoard() {
  $('.game').on('click', event => {
    //get input from user
    //need to IGNORE if thing has text already!
    let stateLocation = getStateLocationFromClassName( getLocationOfBoardClick( $(event.target) ) );
    
    //update state
    updateBoardState(stateLocation);
    updatePlayerTurn();

    //render
    render();

  });
  
}

function handleClickNewGame() {
  $('#new-game').on('click', event => {
    //get input from user => Done by click
    
    //update state
    clearBoard();

    //render
    render();
  });
};

function bindEventListeners() {
  handleClickNewGame();
  handleClickOnBoard();
  render();
}

$(bindEventListeners);