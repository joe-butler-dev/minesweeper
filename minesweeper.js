document.addEventListener('DOMContentLoaded', startGame)

// Create the board
let board = {
  cells: [
    {
      row: 0,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 0,
      col: 1,
      isMine: true,
      hidden: true
    },
    {
      row: 0,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 1,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 2,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 2,
      col: 1,
      isMine: true,
      hidden: true
    },
    {
      row: 2,
      col: 2,
      isMine: true,
      hidden: true
    }]
}

// Function to set up the game
function startGame () {

  // For each cell, determine the number of surrounding cells that are mines to display as hints
  for (i = 0; i < board.cells.length; i++) {
    let cell = board.cells[i];
    cell.surroundingMines = countSurroundingMines(cell);
  }

  // Events to check for a win scenario
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

/* Function to check for a win condition:
1. All cells that are not mines are visible, or;
2. All mines are marked*/
function checkForWin () {

  let countUnmarkedMines = 0;
  let countHiddenCells = 0;

  for (k = 0; k < board.cells.length; k++) {

    let cellBeingChecked = board.cells[k];
    
    if (cellBeingChecked.isMine == true && cellBeingChecked.isMarked != true) {
      countUnmarkedMines++;
    }

    if (cellBeingChecked.isMine != true && cellBeingChecked.hidden == true) {
      countHiddenCells++;
    }
  }

  if (countUnmarkedMines == 0 || countHiddenCells == 0) {
    lib.displayMessage('You win!')
  } else {
    return;
  }
}

/* Function to determine which of the surrounding cells are mines.
It uses the lib.getSurroundingCells function that was already defined */
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