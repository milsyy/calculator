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
