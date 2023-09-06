const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numOne = 0;
let numTwo = 0;
let numOperators = 0;

let operate = (a, b, operator) => {
  if (operator == '+') return add(a, b);
  else if (operator == '-') return subtract(a, b);
  else if (operator == 'x') return multiply(a, b);
  else if (operator == '/') {
    if (b == 0) return 'zero division';
    return divide(a, b);  
  }
};

let getAnswer = (dv) => {
  [numOne, numTwo] = dv.split(/[\+\-\x\/]/);
  let oprMatch = dv.match(/[\+\-\x\/]/);

  if (oprMatch) {
    let opr = oprMatch[0];
    let answer = operate(parseInt(numOne), parseInt(numTwo), opr);

    if (answer == 'zero division') return 'nice try...';
    if (!(isNaN(answer) || answer == null)) {
      return Math.round(answer *  100) / 100;
    }
  }
  return '';
};

let btnPress = btn => {
  let value = btn.target.textContent;
  if (value == 'CLEAR') return clearDisplay();

  let dv = getDisplayValue();
  if (value == 'DEL') return backspace(dv);

  // if (value == '(-)') return negative(dv);
  
  if (btn.target.classList.contains('operator')) {
    numOperators += 1;
  }

  if (value == '=' || numOperators == 2) {
    let ans = getAnswer(dv);

    writeHistory(ans);
    clearDisplay();
    writeDisplay(ans);

    if (value != '=') {
      writeDisplay(value);
      numOperators += 1;
    } 
  } else {
    writeDisplay(value);
  } 
};

let handleError = () => {
  clearDisplay();
  writeHistory('ERROR');
};

let writeDisplay = value => document.querySelector('#display').textContent += value;

let clearDisplay = () => {
  document.querySelector('#display').textContent = '';
  numOperators = 0;
};

let backspace = (dv) => {
  document.querySelector('#display').textContent = dv.slice(0, -1);
}

let writeHistory = ans => {
  let expression = document.querySelector('#display').textContent;
  document.querySelector('#history').textContent = `${expression} = ${ans}`;
};

let getDisplayValue = () => document.querySelector('#display').textContent;

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  button.addEventListener('click', btnPress);
}