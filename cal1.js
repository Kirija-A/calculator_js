//creating objects
// calculator object above consists of everything that we need to construct a valid expression
// displayValue holds a string value that represents the input of the user or the result of an operation
// firstOperand will store the first operand for any expression. It’s set to null for now
// The operator key will store the operator for an expression. Its initial value is also null
// waitingForSecondOperand essentially serves as a way to check if both the first operand and the operator have been inputted. If it’s true, the next numbers that the user enters will constitute the second operand


const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function inputDigit(digit) {
      const {displayValue, waitingForSecondOperand} = calculator;

      if (waitingForSecondOperand === true) {
          calculator.displayValue = digit;
          calculator.waitingForSecondOperand = false;
      } else {
      //overwrite 'displayValue' if the current value is '0' otherwise append
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
      console.log(calculator);
  }
  

  function inputDecimal(dot) {
      if (calculator.waitingForSecondOperand === true){
          calculator.displayValue = '0.'
          calculator.waitingForSecondOperand = false;
          return
      }
      //if the 'diplayValue' property does not contain a decimal point
      if(!calculator.displayValue.includes(dot)) {
          //append the decimal point
          calculator.displayValue += dot;
      }
  }

  function handleOperator(nextOperator) {
      //destructure the properties on the calculator object
      const {firstOperand, displayValue, operator} = calculator
      // 'parseFloat' converts the string contents of 'displayValue'
      // to a floating-point number
      const inputValue = parseFloat(displayValue);

      if(operator && calculator.waitingForSecondOperand){
          calculator.operator = nextOperator;
          console.log(calculator);
          return
      }

      // verify that 'firstOperand' is null and that the 'inputValue'
      // is not a 'Nan' value
      if (firstOperand === null && !isNaN(inputValue)){
          //update the firstOperand property
          calculator.firstOperand = inputValue;
      } else if (operator) {
          const result = calculate(firstOperand, inputValue, operator);

          calculator.displayValue = String(result);
          calculator.firstOperand = result;
      }
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
      console.log(calculator);
  }
  
  function calculate(firstOperand, secondOperand, operator) {
      if (operator === '+'){
          return firstOperand + secondOperand;
      } else if (operator === '-') {
          return firstOperand - secondOperand;
      } else if (operator === '*') {
          return firstOperand * secondOperand;
      } else if (operator === '/') {
          if (secondOperand == 0){
              return "Error";
          }
          return firstOperand / secondOperand;
      }
      return secondOperand;
  }

  function resetCalculator(){
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
      console.log(calculator);
  }

  // Updates display
  function updateDisplay(){
    // selects element with class "calcuator-screen"  
    const display = document.querySelector('.calculator-screen');
    // updates element value with contents "displayValue"
    display.value = calculator.displayValue;
  }
  updateDisplay();

// Refactored event listener
const keys = document.querySelector('.calculator-keys');    
  keys.addEventListener('click', event => {
    const {target} = event;
    const {value} = target;

    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            //check if the key is an integer
            if (Number.isInteger(parseFloat(value))){
                inputDigit(value);
            }    

    }
    updateDisplay();
  });


// Before refactoring
  // Handles key press
//   const keys = document.querySelector('.calculator-keys');
//   keys.addEventListener('click', (event) => {
//       //access the clicked element
//       const {target} = event;

//       //checks for button if not exits
//       if (!target.matches('button')) {
//           return;
//       }

//       if (target.classList.contains('operator')){
//           //console.log('operator', target.value);
//           handleOperator(target.value);
//           updateDisplay();
//           return;
//       }

//       if (target.classList.contains('decimal')){
//           //console.log('decimal', target.value);
//           inputDigit(target.value);
//           updateDisplay();
//           return;
//       }

//       if (target.classList.contains('all-clear')){
//           //console.log('clear', target.value);
//           resetCalculator();
//           updateDisplay();
//           return;
//       }
//       inputDigit(target.value);
//       updateDisplay();
//       //console.log('digit', target.value);

//   });