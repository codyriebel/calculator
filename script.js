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
  else if (operator == '/') return divide(a, b);  }

let getAnswer = () => {
  [numOne, numTwo] = getDisplayValue().split(/[\+\-\x\/]/);
  let opr = getDisplayValue().match(/[\+\-\x\/]/);
  if (
    numOne == undefined|| numTwo == undefined|| opr == undefined || 
    numOne == NaN || numTwo == NaN || opr == NaN || 
    numOne == ''|| numTwo == '' || opr == '' 
  ) {
    clearDisplay();
    writeHistory('ERROR');
    return 'ERROR';
  }
  return operate(parseInt(numOne), parseInt(numTwo), opr);
};

let btnPress = btn => {
  let value = btn.target.textContent;
  if (value == 'CLEAR') return clearDisplay();
  
  if (btn.target.classList.contains('operator')) {
    numOperators += 1;
  }

  if (value == '=' || numOperators == 2) {
    let ans = getAnswer();
    if (ans != 'ERROR') {
      writeHistory(ans);
      clearDisplay();
      writeDisplay(ans);
      if (value != '=') {
        writeDisplay(value);
        numOperators += 1;
      }
    }
  } else {
    writeDisplay(value);
  } 
};

let writeDisplay = value => document.querySelector('#display').textContent += value;

let clearDisplay = () => {
  document.querySelector('#display').textContent = '';
  numOperators = 0;
};

let writeHistory = ans => {
  let expression = document.querySelector('#display').textContent;
  document.querySelector('#history').textContent = `${expression} = ${ans}`;
};

let getDisplayValue = () => document.querySelector('#display').textContent;

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  button.addEventListener('click', btnPress);
}