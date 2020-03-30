//DOM elements
const board = document.querySelector('#board');
const btnNewBoard = document.querySelector('#btn-new-board');
const btnMode = document.querySelector('#btn-mode');
const btnClearBoard = document.querySelector('#btn-clear-board');

//other variables
const boardHeight = 750;
const boardWidth = 750;
const colorModes = ['Black', 'Random', 'Grayscale'];
let currentColorMode = 0;
let numSquaresWide = 75;
const bgColor = '#ccd7da';

//clear current board
function clearBoard() {
  const squares = document.querySelectorAll('.game-board-row-square');
  squares.forEach(square => square.style.backgroundColor = bgColor);
}

//create new board
function createBoard(numSquaresWide) {
  //remove any existing squares
  while(board.firstChild) {
    board.lastChild.remove();
  }
  //add new squares
  for(let rowNum = 0; rowNum < numSquaresWide; rowNum++) {
    const row = document.createElement('div');
    row.classList.add('game-board-row');
    for(let squareNum = 0; squareNum < numSquaresWide; squareNum++) {
      const square = document.createElement('div');
      square.classList.add('game-board-row-square');
      square.style.height = (boardHeight / numSquaresWide) + 'px';
      square.style.width = (boardWidth / numSquaresWide) + 'px';
      square.style.backgroundColor = bgColor;
      square.addEventListener('mouseenter', hoverColor);
      row.appendChild(square);
    }
    board.appendChild(row);
  }
}

// prompt for numSquaresWide and creates new board
function createNewBoard() {
  let input = parseInt(prompt("How many squares per side for new grid?", numSquaresWide), 10);
  if(!input==''){
    numSquaresWide = (isNaN(input)) ? numSquaresWide : input;
    createBoard(numSquaresWide);
  }
}

//changes color mode
function cycleColorMode() {
  currentColorMode = (currentColorMode + 1) % colorModes.length;
  btnMode.innerHTML = 'Current Mode: ' + colorModes[currentColorMode];
}

//changes color of square based on mode
function hoverColor(e) {
  if (colorModes[currentColorMode] == 'Black') {
    e.target.style.backgroundColor = '#000000';
  }
  if (colorModes[currentColorMode] == 'Grayscale') {
    e.target.style.backgroundColor = lightenDarkenColor(e.target.style.backgroundColor, -50);
  }
  if (colorModes[currentColorMode] == 'Random') {
    e.target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}

//TODO: currently works as percentage of current color rather than percentage of 255 meaning the closer to black the less the color changes, not uniform
//takes rgb like rgb(r,g,b) and percent -100:100 (negative darkens)
function lightenDarkenColor(rgbString, percent) {
  let rgb = rgbString.match(/(\d+)/g);
  let r = Math.max(Math.min(parseInt(rgb[0] * (1 + (percent/100)), 10),255), 0);
  let g = Math.max(Math.min(parseInt(rgb[1] * (1 + (percent/100)), 10),255), 0);
  let b = Math.max(Math.min(parseInt(rgb[2] * (1 + (percent/100)), 10),255), 0);

  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

//RUN
btnNewBoard.addEventListener('click', createNewBoard);
btnMode.addEventListener('click', cycleColorMode);
btnClearBoard.addEventListener('click', clearBoard);
board.style.height = boardHeight + 'px';
board.style.width = boardWidth + 'px';
createBoard(numSquaresWide);