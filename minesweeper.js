document.addEventListener('DOMContentLoaded', startGame);

var winSound = new Audio('./sounds/sonic-win.wav');
var loseSound = new Audio('./sounds/sonic-lose.wav');

var boardSize = 4;
var board = {cells: []}

// Function to set up the game
function startGame() {

  // Create the board
  document.getElementById("board").innerHTML = "";
  createBoard();
  determineSurroundingMines();

  // Events to check for a win scenario
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  // Events to reset game with new difficulty
  document.getElementById('easy').addEventListener('click', resetGame);
  document.getElementById('medium').addEventListener('click', resetGame);
  document.getElementById('hard').addEventListener('click', resetGame);
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function resetGame() {
  board = {cells: []};

  if (this.id === 'easy') {
    boardSize = 4;
  } else if (this.id === 'medium') {
    boardSize = 5;
  } else if (this.id === 'hard') {
    boardSize = 6;
  }
  startGame();
}

// Generate the board
function createBoard() {
  for (i = 0; i < boardSize; i++) {
    for (j = 0; j < boardSize; j++) {
      let tileX = i;
      let tileY = j;
      let mineChance = generateMine();

      let newCell = {
        col: tileX,
        row: tileY,
        hidden: true,
        isMine: mineChance
      }
      board.cells.push(newCell);
    }
  }
}

// Randomly determine if a cell should be a mine
function generateMine() {
  let chance = Math.random();
  if (chance <= 0.25) {
    return true;
  } else {
    return false;
  }
}

/* Function to check for a win condition -- if all non-mine cells are revealed.
For reference, a "cell" here is a non-mine cell and a mine is a mine cell */
function checkForWin () {

  let countUnmarkedMines = 0;
  let countMarkedCells = 0;
  let countHiddenCells = 0;

  for (k = 0; k < board.cells.length; k++) {

    let cellBeingChecked = board.cells[k];

    if (cellBeingChecked.isMine != true && cellBeingChecked.hidden == true) {
      countHiddenCells++;
    }
  }

  if (countHiddenCells == 0) {
    lib.displayMessage('You win!')
    winSound.play();
  } else {
    return;
  }
}

// For each cell, determine the number of surrounding cells that are mines to display as hints
function determineSurroundingMines() {
  for (i = 0; i < board.cells.length; i++) {
    let cell = board.cells[i];
    cell.surroundingMines = countSurroundingMines(cell);
  }
}

// Determine which of the surrounding cells are mines
function countSurroundingMines(cell) {
  let surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  let mineCount = 0;

  for (j = 0; j < surroundingCells.length; j++) {
    let individualCell = surroundingCells[j];
    if (individualCell.isMine == true) {
      mineCount++
    }
  }
  return mineCount;
}