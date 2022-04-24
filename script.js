const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');
const clearBtn = document.getElementById('clear-board');
const boardSize = document.getElementById('board-size');
const root = document.querySelector(':root');

// Create repeat elements-
function createElements(elemNum, parentElem, elemName, className) {
  const parentElement = parentElem;
  for (let i = 0; i < elemNum; i += 1) {
    const element = document.createElement(elemName);
    parentElement.appendChild(element).className = `${className} ${className}-${i}`;
  }
}

function deleteElements(parentElem, query) {
  const pixels = document.querySelectorAll(query);
  pixels.forEach((pixel) => {
    parentElem.removeChild(pixel);
  });
}

function setDefaultSelected() {
  const defaultElement = document.querySelector('.color-0');
  defaultElement.classList.add('selected');
}

function generateRandomColors() {
  return `rgb(${Math.random() * (255)}, ${Math.random() * (255)}, ${Math.random() * (255)})`;
}

function setColors() {
  const colors = document.querySelectorAll('.color');
  colors.forEach((c) => {
    const color = c;
    color.style.backgroundColor = generateRandomColors();
  });
  colors[0].style.backgroundColor = 'black';
}

function addEvents(query, event, fun) {
  const elements = document.querySelectorAll(query);
  elements.forEach((elem) => {
    elem.addEventListener(event, fun);
  });
}

function removeEvents(query, event, fun) {
  const elements = document.querySelectorAll(query);
  elements.forEach((elem) => {
    elem.removeEventListener(event, fun);
  });
}

function setStyleVariable(variable, value) {
  root.style.setProperty(variable, value);
}

// Remove the 'selected' class from the element
function unselectColor() {
  const elem = document.getElementsByClassName('color selected');
  [...elem].forEach((e) => {
    e.classList.remove('selected');
  });
}

// Add the 'selected' class to the element
function selectColor(e) {
  const colorElem = e.target;
  colorElem.classList.add('selected');
}

function switchColor(e) {
  unselectColor();
  selectColor(e);
}

function paintPixel(e) {
  const pixelElem = e.target;
  const selectedColor = document.querySelector('.selected');
  pixelElem.style.backgroundColor = selectedColor.style.backgroundColor;
}

function clearboard() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((p) => {
    const pixel = p;
    pixel.style.backgroundColor = 'white';
  });
}

function startFlow(e) {
  paintPixel(e);
  addEvents('.pixel', 'mouseover', paintPixel);
}

function endFlow() {
  removeEvents('.pixel', 'mouseover', paintPixel);
}

function checkSize(size) {
  if (size < 1) {
    window.alert('Board inválido!');
    return false;
  }
  if (size >= 5 && size <= 50) return size;
  if (size < 5) return 5;
  return 50;
}

function resize() {
  const checkedSize = checkSize(boardSize.value);
  console.log(checkedSize);
  if (checkedSize !== false) {
    deleteElements(pixelBoard, '.pixel');
    createElements(checkedSize * checkedSize, pixelBoard, 'div', 'pixel');
    addEvents('.pixel', 'mousedown', startFlow);
  }
  setStyleVariable('--grid-size', checkedSize);
}

window.onload = () => {
  createElements(8, colorPalette, 'div', 'color');
  createElements(25, pixelBoard, 'div', 'pixel');
  setDefaultSelected();
  addEvents('.color', 'click', switchColor);

  addEvents('.pixel', 'mousedown', startFlow);
  addEvents('body', 'mouseup', endFlow);

  addEvents('#generate-board', 'click', resize);

  clearBtn.addEventListener('click', clearboard);

  boardSize.value = 5;
  setStyleVariable('--grid-size', 5);

  setColors();
};
