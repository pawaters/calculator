let display = document.getElementById("display"); 
let calculationDisplay = document.getElementById("calculation-display");
let buttons = Array.from(document.getElementsByClassName("buttons"));
let operator = null;
let currentResult = null;
let awaitingNextOperand = false;
let resultShown = false;
let resultShownCalcDisplay = false;

function clear() {
  display.value = "";
  calculationDisplay.innerHTML = "";
  operator = null;
  currentResult = null;
  awaitingNextOperand = false;
  resultShown = false;
  resultShownCalcDisplay = false;
}

function appendCalculationDisplay(value) {
  calculationDisplay.innerHTML += value;
}

function updateCalculationDisplay(value) {
  calculationDisplay.innerHTML = value;
}

function toggleSign() {
  if (resultShown) {  
    currentResult = -currentResult;
    display.value = currentResult;
    calculationDisplay.innerHTML = currentResult;
  } else if (awaitingNextOperand === false) {
    if (display.value.startsWith("-")) {
      display.value = display.value.slice(1);
    } else {
      display.value = "-" + display.value;
    }
  }

  if (resultShownCalcDisplay) {
    updateCalculationDisplay(currentResult);
    resultShownCalcDisplay = false;
  } else if (awaitingNextOperand === false) {
    let lastNumberRegex = /(?:[+\-*/] )?([0-9.]+)$/;
    let match = calculationDisplay.innerHTML.match(lastNumberRegex);
    if (match) {
      let lastNumber = match[1];
      let newNumber = lastNumber.startsWith("-")
        ? lastNumber.slice(1)
        : "-" + lastNumber;
      calculationDisplay.innerHTML = calculationDisplay.innerHTML.replace(
        lastNumberRegex,
        newNumber
      );
    }
  }
}

function percent() {
 if (awaitingNextOperand === false || resultShown) {
    display.value = parseFloat(display.value) / 100;
    currentResult = display.value;
    updateCalculationDisplay(display.value);
  }
}

function appendNumber(number) {
  if (resultShownCalcDisplay) {
    calculationDisplay.innerHTML = "";
    resultShownCalcDisplay = false;
  }
  if (awaitingNextOperand || resultShown) {
    display.value = "";
    awaitingNextOperand = false;
    resultShown = false;
  }
  if (number === "." && display.value.includes(".")) return;
  display.value += number;
  appendCalculationDisplay(number);
}

function performCalculation(operand) {
  currentResult = eval(currentResult + " " + operator + " " + operand);
  currentResult = Math.round(currentResult * 1000000000000) / 1000000000000;
  display.value = currentResult;
}

function chooseOperation(oper) {
  if (resultShownCalcDisplay) {
    calculationDisplay.innerHTML = currentResult;
    resultShownCalcDisplay = false;
  }
  if (resultShown) {
    resultShown = false;
    operator = oper;
    awaitingNextOperand = true;
    appendCalculationDisplay(" " + operator + " ");
    return;
  }

  let operand = parseFloat(display.value);

  // Perform calculation if operator was already chosen
  if (operator !== null && !awaitingNextOperand) {
    performCalculation(operand);
  } else {
    currentResult = operand;
  }

  awaitingNextOperand = true;
  operator = oper;
  appendCalculationDisplay(" " + operator + " ");
}

function compute() {
  let operand = parseFloat(display.value);
  if (operator === null || awaitingNextOperand) {
    return;
  }
  if (operator === "/" && operand === 0) {
    display.value = "Error: Cannot Divide by 0";
    operator = null;
    currentResult = null;
    awaitingNextOperand = false;
    return;
  }
  performCalculation(operand);
  operator = null;
  awaitingNextOperand = false;
  resultShown = true;
  resultShownCalcDisplay = true;
}

window.clear = clear;
window.appendNumber = appendNumber;
window.toggleSign = toggleSign;
window.percent = percent;
window.chooseOperation = chooseOperation;
window.compute = compute;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const buttonValue = e.target.innerText;
      switch (buttonValue) {
        case "C":
          clear();
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          chooseOperation(buttonValue);
          break;
        case "=":
          compute();
          break;
        case ".":
          appendNumber(buttonValue);
          break;
        case "-/+":
          toggleSign();
          break;
        case "%":
          percent();
          break;
        default:
          if (!isNaN(buttonValue)) {
            appendNumber(buttonValue);
          }
          break;
      }
    }
  });
});

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if ((key >= "0" && key <= "9") || key === ".") {
    appendNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperation(key);
  } else if (key === "Escape") {
    clear();
  } else if (key === "Enter" || key === "=") {
    compute();
  }
});