const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numOne = 0;
let numTwo = 0;
let operator = '';
let ans = null;

let operate = (a, b, operator) => {
  if (operator == '+') return add(a, b);
  else if (operator == '-') return subtract(a, b);
  else if (operator == 'x') return multiply(a, b);
  else if (operator == '/') return divide(a, b);  }

let getAnswer = () => {
  [numOne, numTwo] = getDisplayValue().split(/[\+\-\x\/]/);
  operator = getDisplayValue().match(/[\+\-\x\/]/);
  ans = operate(parseInt(numOne), parseInt(numTwo), operator);
  return ans;
};

let btnPress = btn => {
  if (ans) {
    clearDisplay();
    ans = null;
  }
  let value = btn.target.textContent;
  if (value == 'clear') return clearDisplay();
  writeDisplay(value);
  if (value == '=') writeDisplay(getAnswer());
};

let writeDisplay = value => document.querySelector('#display').textContent += value;

let clearDisplay = () => document.querySelector('#display').textContent = '';

let getDisplayValue = () => document.querySelector('#display').textContent;

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  button.addEventListener('click', btnPress);
}