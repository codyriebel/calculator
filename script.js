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
  neg = 0;
  ind = null;
};

let del = () => {
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

let writeHistory = (before, ans) => {
  document.querySelector('#history').textContent = `${before} = ${ans}`;
};

let operate = (a, b, operator) => {
  if (operator == '+') return add(a, b);
  else if (operator == '-') return subtract(a, b);
  else if (operator == 'x') return multiply(a, b);
  else if (operator == '/') {
    if (b == 0) return 'zero division';
    return divide(a, b);  
  }
};

let getAnswer = () => {
  let answer = operate(parseInt(numOne), parseInt(numTwo), operator);

  if (answer == 'zero division') return 'nice try...';
  if (isNaN(answer) || answer == null) {
    return '';
  }  
  return Math.round(answer *  1000000) / 1000000;
};

function btnPress(btn) {
  let value = btn.target.textContent;
  let classes = btn.target.classList;
  let txt = display.textContent;
  
  if (value == 'CLEAR') {
    clearDisplay();

  } else if (value == 'DEL') {
    del();    

  } else if (classes.contains('operator')) {
    numOperators++;

    if (numOperators == 1) {
      writeDisplay(value);
      operator = value; 
    }
    
    if (value == '-' && ind == null) {
      ind = txt.length;
    }

  } else if (value == '(-)') {
      neg++;

      let isPreviousNum = !isNaN(parseInt(txt.slice(-1)));

      if (!isPreviousNum) {
        writeDisplay('-');
      
      } else {
        display.textContent = '-' + txt;
      }
  
  } else if (value != ('=')) {
    writeDisplay(value);
  }

  if (!(value == '=' || numOperators == 2)) {
    return;
  }

  let dv = display.textContent;
  if (ind == null) {
    ind = dv.indexOf(operator);
  }
  numOne = dv.slice(0, ind);
  numTwo = dv.slice(ind+1, )

  let ans = getAnswer();

  writeHistory(txt, ans);
  clearDisplay();
  writeDisplay(ans);
    
  if (!classes.contains('operator')) {
    return;
  }

  if (value == '-') {
    ind = display.textContent.length;
  }

  writeDisplay(value);
  numOperators++;
  operator = value;
}  
