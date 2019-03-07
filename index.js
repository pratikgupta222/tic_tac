/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
*
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}
// console.log("This is the temp array : ", tempArray)

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    // console.log("This is the column div : ", columnDivs)
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function getRowValues(rowx, colx) {
    
}

function getDiagonalValues(rowx, colx) {
  var diag1_count = 0
  var diag2_count = 0
  var diag1 = []
  var diag2 = []
  var out = []
  // console.log("This is rowx === ", rowx)
  // console.log("This is colx ==== ", colx)
  // console.log("This is rowx === ", rowx == (GRID_LENGTH - 1))
  // console.log("This is colx ==== ", colx == 0)

  if (((colx == GRID_LENGTH -1) && (rowx == 0)) ||
        (rowx == colx) ||
        ((rowx == GRID_LENGTH -1) && (colx == 0))
      ) {
    for (let i=0; i < GRID_LENGTH; i++) {
        diag1[i] = grid[i][i]
        console.log("This is drag 1 ==== ", diag1)
        console.log("This is i ==== ", i)
        if (i != 0 && diag1[i] == diag1[i-1] && diag1[i] !=0) {
            diag1_count += 1
        }
      }
    for (let i=GRID_LENGTH-1; i >= 0; i--) {
        diag2[i] = grid[i][GRID_LENGTH-1 -i]
        console.log("This is drag 2 ==== ", diag2)
        console.log("This is i ==== ", i)
        if (i != GRID_LENGTH-1 && diag2[i] == diag2[i+1] && diag2[i] !=0) {
            diag2_count += 1
        }
      }
    if (diag1_count === 2 || diag2_count === 2) {
      console.log("Winner")
      return false;
    }

    else if (diag1_count === 1) {
      for (let i=0; i < GRID_LENGTH; i++) {
          if (diag1[i] == 0) {
            return [i, i];
          }
      }
    }

    else if (diag2_count === 1) {
      for (let i=GRID_LENGTH-1; i >= 0; i--) {
          if (diag1[i] == 0) {
            return [i, i];
          }
      }
    }

    else {
      if (colx >= rowx) {
        for (let i=0; i < GRID_LENGTH; i++) {
            if (diag1[i] == 0) {
              return [i, i];
            }
          }
      }

      if (rowx > colx) {
        for (let i=GRID_LENGTH-1; i >= 0; i--) {
            if (diag2[i] == 0) {
              console.log("==================== ", GRID_LENGTH -11 -i);
              return [i, GRID_LENGTH -1 -i];
            }
          }
      }
    }
  }
}

function getComputerClick(rowx, colx) {
    var res = getDiagonalValues(rowx, colx)
    console.log("This is res ============= ",res)
    if (res) {
      grid[res[0]][res[1]] = 2;
    }
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    console.log(rowIdx)
    console.log(colIdx)
    grid[colIdx][rowIdx] = newValue;
    getComputerClick(rowIdx, colIdx);
    renderMainGrid();
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
