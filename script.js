let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('buttons'));
let operator = null;
let currentResult = null;
let awaitingNextOperand = false;
let resultShown = false;

//helper functions to keep it modular and not repeat myself
function clear() {
    display.value = "";
    operator = null;
    currentResult = null;
    awaitingNextOperand = false;
    resultShown = false;
}

function toggleSign() {
    if (display.value.startsWith('-')) {
        display.value = display.value.slice(1);
    } else {
        display.value = '-' + display.value;
    }
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function percent() {
    display.value = parseFloat(display.value) / 100;
}

function appendNumber(number) {
    if(awaitingNextOperand || resultShown) {
        display.value = '';
        awaitingNextOperand = false;
        resultShown = false;
    }
    if (number === ',' && display.value.includes(',')) return;
    display.value += number;
}

function chooseOperation(oper) {
    if(resultShown){
        resultShown = false;
        operator = oper;
        awaitingNextOperand = true;
        return;
    }
    
    let operand = parseFloat(display.value);

    // Perform calculation if operator was already chosen
    if(operator !== null && !awaitingNextOperand) {
        currentResult = eval(currentResult + ' ' + operator + ' ' + operand);
        currentResult = Math.round(currentResult * 1000000000000) / 1000000000000;
        display.value = currentResult;
    } else {
        currentResult = operand;
    }

    awaitingNextOperand = true;
    operator = oper;
}

function compute() {
    let operand = parseFloat(display.value);
    if(operator === null || awaitingNextOperand) {
        return;
    }
    if(operator === '/' && operand === 0) {
        display.value = 'Error: Cannot Divide by 0';
        operator = null;
        currentResult = null;
        awaitingNextOperand = false;
        return;
    }
    currentResult = eval(currentResult + ' ' + operator + ' ' + operand);
    currentResult = Math.round(currentResult * 1000000000000) / 1000000000000;
    display.value = currentResult;
    operator = null;
    awaitingNextOperand = false;
    resultShown = true;
}

buttons.map(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        if (buttonText >= '0' && buttonText <= '9') {
            appendNumber(buttonText);
        } else if (buttonText === ',') {
            appendNumber(buttonText);
        } else if (buttonText === 'C') {
            clear();
        } else if (buttonText === 'Del') {
            deleteLast();
        } else if (buttonText === '-/+') {
            toggleSign();
        } else if (buttonText === '%') {
            percent();
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            chooseOperation(buttonText);
        } else if (buttonText === '=') {
            compute();
        }
    });
});

window.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === ',') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperation(key);
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clear();
    } else if (key === 'Enter' || key === '=') {
        compute();
    }
});

// TESTS
document.getElementById('test-button').addEventListener('click', runTests);
const resultDiv = document.getElementById('test-results');  

function runTest(commands, expectedResult) {
    clear();
    let testDescription = '';
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        if (typeof command === 'number' || command.includes(',')) {
            appendNumber(command.toString());
            testDescription += command.toString();
        } else if (['+', '-', '*', '/', '=', 'Del', '-/+', '%'].includes(command)) {
            if (command === '=') {
                compute();
            } else if (command === 'Del') {
                deleteLast();
            } else if (command === '-/+') {
                toggleSign();
            } else if (command === '%') {
                percent();
            } else {
                chooseOperation(command);
            }
            testDescription += ' ' + command + ' ';
        }
    }
    const result = display.value == expectedResult ? "Passed" : "Failed";
    resultDiv.innerHTML += `${testDescription} Expected: ${expectedResult} Output: ${display.value} --> ${result}<br>`;
}

function runTests() {
    resultDiv.innerHTML = ""; // clear previous test results
    runTest([4, '+', 2, '-', 2, '/', 2, '*', 2, '='], '4');
    runTest([4, '+', '+', 2, '=', '-', 2, '/', 2, '*', 2, '='], '4');
}

