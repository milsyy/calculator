display = document.querySelector(".first-layer");
buttons = document.querySelector(".third-layer");
clear = document.querySelector(".clear");

let firstNum;
let operator;
let secondNum;

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (firstNum, operator, secondNum) => {
  if (operator === "+") {
    add(firstNum, secondNum);
  } else if (operator === "-") {
    subtract(firstNum, secondNum);
  } else if (operator === "*") {
    multiply(firstNum, secondNum);
  } else {
    divide(firstNum, secondNum);
  }
};

const updateDisplay = (e) => {
  if (!isNaN(e.target.textContent) && display.textContent === "0") {
    display.textContent = e.target.textContent;
    firstNum = display.textContent;
  } else if (!isNaN(e.target.textContent) && operator == null) {
    display.textContent += e.target.textContent;
    firstNum += e.target.textContent;
  } else if (
    isNaN(e.target.textContent) &&
    e.target.textContent != "." &&
    e.target.textContent != "="
  ) {
    operator = e.target.textContent;
  } else if (
    !isNaN(e.target.textContent) &&
    operator != null &&
    secondNum == null
  ) {
    display.textContent = e.target.textContent;
    secondNum = display.textContent;
  } else if (
    !isNaN(e.target.textContent) &&
    operator != null &&
    secondNum != null
  ) {
    display.textContent += e.target.textContent;
    secondNum += e.target.textContent;
  }
};

const clearDisplay = () => {
  display.textContent = "0";
  firstNum = null;
  secondNum = null;
  operator = null;
};

buttons.addEventListener("click", updateDisplay);
clear.addEventListener("click", clearDisplay);
