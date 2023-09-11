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

const display = document.querySelector('#display');

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
  const button = {
    value: btn.target.textContent,
    classes: btn.target.classList,
  };
  let txt = display.textContent;
  startCalculatorFunctions(button, txt);
}

const buttons = document.querySelectorAll('button');
for (let buttonElement of buttons) {
  buttonElement.addEventListener('click', clickButton);
}

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
}

let changeHistory = (before, ans) => {
  document.querySelector('#history').textContent = `${before} = ${ans}`;
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
  let answer = getOperation(parseInt(numOne), parseInt(numTwo), operator);

  if (answer == 'zero division') return 'nice try...';
  if (isNaN(answer) || answer == null) {
    return '';
  }  
  return Math.round(answer *  1000000) / 1000000;
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
}

let addNeg = textDisplayed => {
  let isPreviousNum = !isNaN(parseInt(textDisplayed.slice(-1)));

  if (!isPreviousNum) {
    appendDisplay('-');
  } else {
    display.textContent = '-' + textDisplayed;
  }
}

let startCalculation = (btn, textDisplayed) => {
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
    
  if (!btn.classes.contains('operator')) {
    return;
  }
  
  appendDisplay(btn.value);
  numOperators++;
  operator = btn.value;
}  

let startCalculatorFunctions = (btn, textDisplayed) => {
  if (btn.value == 'CLEAR') {
    deleteDisplay();

  } else if (btn.value == 'DEL') {
    deleteChar();    

  } else if (btn.classes.contains('operator')) {
    updateOperators(btn.value, textDisplayed);
    numOperators++;
    
  } else if (btn.value == '(-)') {
      addNeg(textDisplayed)
      neg++;

  } else if (btn.value != ('=')) {
    appendDisplay(btn.value);
  }

  if (btn.value == '=' || numOperators == 2) {
    startCalculation(btn, textDisplayed);
  }
}

