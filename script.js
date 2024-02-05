const display = document.querySelector(".first-layer");
const buttons = document.querySelector(".third-layer");
const clear = document.querySelector(".clear");
const deleter = document.querySelector(".delete");

let firstNum;
let operator;
let secondNum;
let result;

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (firstNum, operator, secondNum) => {
  if (operator == "+") {
    return add(firstNum, secondNum);
  } else if (operator == "-") {
    return subtract(firstNum, secondNum);
  } else if (operator == "x") {
    return multiply(firstNum, secondNum);
  } else {
    return divide(firstNum, secondNum);
  }
};

const updateDisplay = (e) => {
  if (e.target.classList.contains("number") && display.textContent === "0") {
    display.textContent = e.target.textContent;
    firstNum = display.textContent;
  } else if (
    e.target.classList.contains("number") &&
    operator == null &&
    display.textContent.length <= 9
  ) {
    display.textContent += e.target.textContent;
    firstNum += e.target.textContent;
  } else if (e.target.classList.contains("operator")) {
    operator = e.target.textContent;
  } else if (
    e.target.classList.contains("number") &&
    operator != null &&
    secondNum == null
  ) {
    display.textContent = e.target.textContent;
    secondNum = display.textContent;
  } else if (
    e.target.classList.contains("number") &&
    operator != null &&
    secondNum != null &&
    display.textContent.length <= 9
  ) {
    display.textContent += e.target.textContent;
    secondNum += e.target.textContent;
  }
};

const doCalc = (e) => {
  if (e.target.classList.contains("equal")) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    result = operate(firstNum, operator, secondNum);
    result = parseFloat(result);
    if (result < 9999999 && result > -9999999 && result != null) {
      //   LOGIC FOR BELOW
      //   let x = "3.000";
      //   console.log(parseFloat(x)); --> outputs 3 as number --> toFixed() returns string w 3 decimals
      display.textContent = parseFloat(result.toFixed(3));
      firstNum = result;
      secondNum = null;
      result = null;
    } else {
      display.textContent = result.toExponential(4);
      firstNum = result;
      secondNum = null;
      result = null;
    }
  }
};

const clearDisplay = () => {
  display.textContent = "0";
  firstNum = null;
  secondNum = null;
  operator = null;
};

const deleteDisplay = () => {
  if (secondNum == null) {
    display.textContent = firstNum.slice(0, firstNum.length - 1);
    firstNum = firstNum.slice(0, firstNum.length - 1);
  } else if (secondNum != null) {
    display.textContent = secondNum.slice(0, secondNum.length - 1);
    secondNum = secondNum.slice(0, secondNum.length - 1);
  }
};

buttons.addEventListener("click", updateDisplay);
buttons.addEventListener("click", doCalc);
clear.addEventListener("click", clearDisplay);
deleter.addEventListener("click", deleteDisplay);
