const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numOne = 0;
let numTwo = 0;
let operator = '';
let numOperators = 0;

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
};

let writeHistory = ans => {
  let expression = display.textContent;
  document.querySelector('#history').textContent = `${expression} = ${ans}`;
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
    if (!(isNaN(answer) || answer == null)) {
      return Math.round(answer *  1000) / 1000;
    }
  return '';
};

function btnPress(btn) {
  let value = btn.target.textContent;
  
  if (value == 'CLEAR') {
    clearDisplay();

  } else if (value == 'DEL') {
    display.textContent = dv.slice(0, -1); 
  
  } else if (value == '=') {
  
    let dv = display.textContent.split('');
    
    for (i = 0; i < dv.length; i++) {
      if (dv[i].search(/[\+\x\/]/) != -1) {
        operator = dv[i];
        numOne = dv.slice(0, i).join('');
        numTwo = dv.slice(i+1,).join('');
        numOperators += 1;
      }
      
      else if (dv[i] == '-' && i != 0 && operator != '-') {
        // minus
        if (
          !isNaN(dv[i-1]) && 
          !isNaN(dv[i+1])
        ) {
          operator = '-'
          numOne = dv.slice(0, i).join('');
          numTwo = dv.slice(i+1,).join('');
          numOperators += 1;

        // second num neg
        } else {
          operator = dv[i-1];
          numOne = dv.slice(0, i-1).join('');
          numTwo = dv.slice(i,).join('');
        } 
      }
    }
  }
    
  if (value == '=') {
    console.log(numOne);
    console.log(numTwo);
    // console.log(numOperators);
    
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
