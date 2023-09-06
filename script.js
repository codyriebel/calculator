const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numOne = 0;
let numTwo = 0;
let operator = '';
let numOperators = 0;
let numMinus = 0;

let display = document.querySelector('#display');

let buttons = document.querySelectorAll('button');
for (button of buttons) {
  button.addEventListener('click', btnPress);
}

let writeDisplay = value => display.textContent += value;

let clearDisplay = () => {
  display.textContent = '';
  numOne = 0;
  numTwo = 0;
  operator = '';
  numOperators = 0;
  numMinus = 0;
};

let writeHistory = ans => {
  let expression = display.textContent;
  document.querySelector('#history').textContent = `${expression} = ${ans}`;
};

let operate = (a, b, operator) => {
  if (operator == '+') return add(a, b);
  else if (operator == 'minus') return subtract(a, b);
  else if (operator == 'x') return multiply(a, b);
  else if (operator == '/') {
    if (b == 0) return 'zero division';
    return divide(a, b);  
  }
};

let getAnswer = () => {
    let answer = operate(parseInt(numOne), parseInt(numTwo), operator);

    if (answer == 'zero division') return 'nice try...';
    if (!(isNaN(answer) || answer == null)) {
      return Math.round(answer *  1000) / 1000;
    }
  return '';
};

function btnPress(btn) {
  let value = btn.target.textContent;
  let dv = display.textContent

  numOperators = dv.search(/[\+\x\/]/g).length;

  if (value == 'CLEAR') {
    clearDisplay();

  } else if (value == 'DEL') {
    display.textContent = dv.slice(0, -1); 

  } else if (value == '-') {
    // if first or second number neg
    if (dv == '' || numOperators + numMinus > 0) return;
    // if operator minus
    else {
      numOne = dv;
      numMinus += 1;
      operator = 'minus';
    }

    // if other operator
  } else if (
    value.search(/[\+\x\/]/) &&
    numOperators == 0
  ) {
    operator = value;
    numOperators += 1;

  }
  
  if (value == '=' || numOperators + numMinus == 2) {
    if (numMinus > 0) {
      numTwo = display.textContent.split('-')[1];
    } else {
      numTwo = display.textContent.split(operator)[1];
    }
    
    let ans = getAnswer();

    writeHistory(ans);
    clearDisplay();
    writeDisplay(ans);

    // if other operator
    if (value != '=') {
      writeDisplay(value);
      operator = value;
      numOperators += 1;
    } 
    return;
  }
  
  if (!(btn.target.classList.contains('fcn'))) {
    writeDisplay(value);
  }

  
};
