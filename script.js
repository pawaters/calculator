let display = document.getElementById("display");
let calculationDisplay = document.getElementById("calculation-display");
let buttons = Array.from(document.getElementsByClassName("buttons"));
let operator = null;
let currentResult = null;
let awaitingNextOperand = false;
let resultShown = false;
let resultShownCalcDisplay = false;
let lastEnteredOperator = false;

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
  let lastEntry =
    calculationDisplay.innerHTML[calculationDisplay.innerHTML.length - 1];
  const operators = ["+", "-", "*", "/"];

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
  if (awaitingNextOperand === false) {
    display.value = parseFloat(display.value) / 100;
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
  lastEnteredOperator = false;
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
  lastEnteredOperator = true;
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

document.getElementById("test-button").addEventListener("click", runTests);
const resultDiv = document.getElementById("test-results");

function handleTests() {
  let testButton = document.getElementById("test-button");
  let clearTestButton = document.getElementById("clear-test-button");
  if (testButton.style.display !== "none") {
    runTests();
    testButton.style.display = "none";
    clearTestButton.style.display = "inline-block";
  }
}

function clearTests() {
  let testButton = document.getElementById("test-button");
  let clearTestButton = document.getElementById("clear-test-button");
  let testTable = document.getElementById("test-table");
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  testTable.style.display = "none";
  clearTestButton.style.display = "none";
  testButton.style.display = "inline-block";
}

function runTest(commands, expectedResult) {
  clear();
  let testDescription = "";
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    if (typeof command === "number" || command.includes(".")) {
      appendNumber(command.toString());
      testDescription += command.toString();
    } else if (["+", "-", "*", "/", "=", "-/+", "%"].includes(command)) {
      if (command === "=") {
        compute();
      } else if (command === "-/+") {
        toggleSign();
      } else if (command === "%") {
        percent();
      } else {
        chooseOperation(command);
      }
      testDescription += " " + command + " ";
    }
  }
  const result = display.value == expectedResult ? "Passed" : "Failed";
  let tableBody = document.getElementById("table-body");
  let row = tableBody.insertRow();
  row.insertCell(0).innerHTML = testDescription;
  row.insertCell(1).innerHTML = expectedResult;
  row.insertCell(2).innerHTML = display.value;
  row.insertCell(3).innerHTML = result;
  clear();
}

function runTests() {
  let testTable = document.getElementById("test-table");
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  testTable.style.display = "block";
  runTest([4, "+", 2, "-", 2, "/", 4, "*", 2, "="], "2");
  runTest([4, "-/+", "+", 2, "="], "-2");
  runTest(["2.0001", "+", "1.0001", "="], "3.0002");
  runTest([8, "%", "=", "*", 2, "="], "0.16");
  runTest([1, "/", 0, "="], "Error: Cannot Divide by 0");
  runTest([1, "+", "0.1", "=", "+", "0.2", "="], "1.3");
  runTest([1, "+", "+", 2, "="], "3");
  runTest([1, "+", 2, "+", 3, "+", 4, "="], "10");
  runTest([1, "+", 2, "*", 3, "="], "9");
  runTest(["1.1", "+", "2.2", "="], "3.3");
  runTest([100, "+", "%", 200, "="], "300");
  runTest([100, "+", 200, "=", "%"], "3");
  runTest([100, "+", "-/+", 200, "="], "300");
  runTest([100, "-/+", "+", "-/+", 200, "="], "100");
  runTest([100, "+", 200, "=", "-/+"], "-300");
  runTest([10, "/", 3, "="], "3.333333333333");
  runTest([10000000000, "*", 1000000000, "="], "10000000000000000000");
  runTest([1, "/", 1000000000000, "="], "1e-12");
  runTest([100, "+", 200, "=", "%"], "3");
}
