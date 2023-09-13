const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numOne = 0;
let numTwo = 0;
let operator = '';
let numOperators = 0;
let neg = 0;
let ind = null;

const display = document.querySelector('.display');

let deleteDisplay = () => {
  display.textContent = '';
  numOne = 0;
  numTwo = 0;
  operator = '';
  numOperators = 0;
  neg = 0;
  ind = null;
};

let clickButton = btn => {
  let value = btn.target.textContent;
  let isOperator = btn.target.classList.contains('operator')
  startCalculatorFunctions(value, isOperator);
};

const buttons = document.querySelectorAll('button');
for (let buttonElement of buttons) {
  buttonElement.addEventListener('click', clickButton);
}

let keyHandler = key => {
  let isOperator = /x|\+|-|\//.test(key.key);

  let isNum = parseInt(key.key);

  let isEquals = key.key == '=';

  let isDot = key.key == '.';

  if (isOperator || isNum || isEquals || isDot) {
    startCalculatorFunctions(key.key, isOperator);
  }

  if (key.key == 'Enter') {
    startCalculatorFunctions('=', isOperator);
  }

  if (key.key == 'Backspace') {
    startCalculatorFunctions('DEL', isOperator);
  }
  
};

window.addEventListener('keydown', keyHandler);

let appendDisplay = value => display.textContent += value;

let deleteChar = () => {
  let deleted = display.textContent.slice(-1);
  display.textContent = display.textContent.slice(0, -1);

  if (!/x|\+|-|\//.test(deleted)) {
    return;
  } else if (deleted != '-') {
    numOperators--;
  } else if (!neg == 0) {
    neg--;
  } else  {
    numOperators--;
  }
};

let changeHistory = (before, ans) => {
  document.querySelector('.history').textContent = `${before} = ${ans}`;
};

let getOperation = (a, b, operator) => {
  if (operator == '+') return add(a, b);
  else if (operator == '-') return subtract(a, b);
  else if (operator == 'x') return multiply(a, b);
  else if (operator == '/') {
    if (b == 0) return 'zero division';
    return divide(a, b);  
  }
};

let getAnswer = () => {
  let answer = getOperation(parseFloat(numOne), parseFloat(numTwo), operator);

  if (answer == 'zero division') return 'nice try...';
  if (isNaN(answer) || answer == null) {
    return '';
  }  
  return Math.round(answer.toFixed(4)*10000)/10000;
};

let updateOperators = (opr, textDisplayed) => {
  if (numOperators == 0) {
    appendDisplay(opr);
    operator = opr; 
  
  // secondary subtraction
  } else if (opr == '-') {
    return;
  }

  // single subtraction
  if (opr == '-' && ind == null) {
    ind = textDisplayed.length;
  }
};

let addNeg = textDisplayed => {
  let isPreviousNum = !isNaN(parseInt(textDisplayed.slice(-1)));

  if (!isPreviousNum) {
    appendDisplay('-');
  } else {
    display.textContent = '-' + textDisplayed;
  }
};

let startCalculation = (val, isOperator, textDisplayed) => {
  let dv = display.textContent;
  if (ind == null) {
    ind = dv.indexOf(operator);
  }
  numOne = dv.slice(0, ind);
  numTwo = dv.slice(ind+1, )

  let ans = getAnswer();

  changeHistory(textDisplayed, ans);
  deleteDisplay();
  appendDisplay(ans);
    
  if (!isOperator) {
    return;
  }
  
  appendDisplay(val);
  numOperators++;
  operator = val;
};

let startCalculatorFunctions = (val, isOperator) => {
  let textDisplayed = display.textContent;

  if (val == 'CLR') {
    deleteDisplay();

  } else if (val == 'DEL') {
    deleteChar();    

  } else if (isOperator) {
    updateOperators(val, textDisplayed);
    numOperators++;
    
  } else if (val == '(-)') {
      addNeg(textDisplayed)
      neg++;

  } else if (val != ('=')) {
    appendDisplay(val);
  }

  if (val == '=' || numOperators == 2) {
    startCalculation(val, isOperator,textDisplayed);
  }
};
