const display = document.querySelector(".first-layer");
const buttons = document.querySelector(".third-layer");
const clear = document.querySelector(".clear");
const deleter = document.querySelector(".delete");

let firstNum;
let operator;
let secondNum;
let result;
let decimal = false;

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
    if (e.target.textContent == ".") {
      decimal = true;
    }
  } else if (
    e.target.classList.contains("number") &&
    operator == null &&
    display.textContent.length <= 9 &&
    (decimal == false || e.target.textContent != ".")
  ) {
    display.textContent += e.target.textContent;
    firstNum += e.target.textContent;
    if (e.target.textContent == ".") {
      decimal = true;
    }
  } else if (
    e.target.classList.contains("operator") &&
    !isNaN(parseFloat(firstNum))
  ) {
    operator = e.target.textContent;
    decimal = false;
  } else if (
    e.target.classList.contains("number") &&
    operator != null &&
    secondNum == null
  ) {
    display.textContent = e.target.textContent;
    secondNum = display.textContent;
    if (e.target.textContent == ".") {
      decimal = true;
    }
  } else if (
    e.target.classList.contains("number") &&
    operator != null &&
    secondNum != null &&
    display.textContent.length <= 9 &&
    (decimal == false || e.target.textContent != ".")
  ) {
    display.textContent += e.target.textContent;
    secondNum += e.target.textContent;
    if (e.target.textContent == ".") {
      decimal = true;
    }
  }
};

const doCalc = (e) => {
  if (
    (e.target.classList.contains("equal") ||
      e.key === "=" ||
      e.key === "Enter") &&
    !isNaN(parseFloat(firstNum)) &&
    !isNaN(parseFloat(secondNum))
  ) {
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
  decimal = false;
};

const deleteDisplay = () => {
  if (secondNum == null) {
    if (firstNum.toString().charAt(firstNum.length - 1) === ".") {
      decimal = false;
    }

    display.textContent = firstNum.slice(0, firstNum.length - 1);
    firstNum = firstNum.slice(0, firstNum.length - 1);
  } else if (secondNum != null) {
    if (secondNum.toString().charAt(secondNum.length - 1) === ".") {
      decimal = false;
    }

    display.textContent = secondNum.slice(0, secondNum.length - 1);
    secondNum = secondNum.slice(0, secondNum.length - 1);
  }
};

const numKey = (e) => {
  if (
    e.key == "0" ||
    e.key == "1" ||
    e.key == "2" ||
    e.key == "3" ||
    e.key == "4" ||
    e.key == "5" ||
    e.key == "6" ||
    e.key == "7" ||
    e.key == "8" ||
    e.key == "9" ||
    e.key == "."
  )
    if (firstNum == null && display.textContent === "0") {
      display.textContent = e.key;
      firstNum = display.textContent;
      if (e.key == ".") {
        decimal = true;
      }
    } else if (
      secondNum == null &&
      operator == null &&
      display.textContent.length <= 9 &&
      (decimal == false || e.key != ".")
    ) {
      display.textContent += e.key;
      firstNum += e.key;
      if (e.key == ".") {
        decimal = true;
      }
    } else if (operator != null && secondNum == null) {
      display.textContent = e.key;
      secondNum = display.textContent;
      if (e.key == ".") {
        decimal = true;
      }
    } else if (
      operator != null &&
      secondNum != null &&
      display.textContent.length <= 9 &&
      (decimal == false || e.key != ".")
    ) {
      display.textContent += e.key;
      secondNum += e.key;
      if (e.key == ".") {
        decimal = true;
      }
    }
};

const operatorKey = (e) => {
  if ((e.key === "+" || e.key === "-" || e.key === "/") && firstNum != null) {
    operator = e.key;
    decimal = false;
  } else if ((e.key === "*" || e.key === "x") && firstNum != null) {
    operator = "x";
    decimal = false;
  }
};

const calculation = (e) => {
  if (firstNum != null && secondNum != null && operator != null) {
    doCalc();
  }
  if (e.key === "c") {
    clearDisplay();
  }
  if (e.key === "Backspace") {
    deleteDisplay();
  }
};

buttons.addEventListener("click", updateDisplay);
buttons.addEventListener("click", doCalc);
clear.addEventListener("click", clearDisplay);
deleter.addEventListener("click", deleteDisplay);
window.addEventListener("keydown", numKey);
window.addEventListener("keydown", operatorKey);
window.addEventListener("keydown", calculation);
window.addEventListener("keydown", doCalc);
