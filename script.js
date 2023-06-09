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

function handleTests() {
    let testButton = document.getElementById('test-button');
    let clearTestButton = document.getElementById('clear-test-button');
    if (testButton.style.display !== 'none') {
        runTests();
        testButton.style.display = 'none';
        clearTestButton.style.display = 'inline-block';
    } 
}

function clearTests() {
    let testButton = document.getElementById('test-button');
    let clearTestButton = document.getElementById('clear-test-button');
    let testTable = document.getElementById('test-table');
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; // clear previous test results
    testTable.style.display = "none"; // hide the table
    clearTestButton.style.display = 'none';
    testButton.style.display = 'inline-block';
}

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
    let tableBody = document.getElementById('table-body');
    let row = tableBody.insertRow();
    row.insertCell(0).innerHTML = testDescription;
    row.insertCell(1).innerHTML = expectedResult;
    row.insertCell(2).innerHTML = display.value;
    row.insertCell(3).innerHTML = result;
}

function runTests() {
    let testTable = document.getElementById('test-table');
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; // clear previous test results
    testTable.style.display = "block"; // make the table visible
    runTest([4, '+', 2, '-', 2, '/', 4, '*', 2, '='], '2');
    runTest([4, '-/+', '+', 2, '='], '-2');
    runTest(['2,0005', '+', '1,0005', '='], '3.0005');
    runTest([8, '%', '=', '*', 2, '='], '0.16');
    runTest([1, '/', 0, '='], 'Error: Cannot Divide by 0');
    runTest([1, '+', '0,1', '=', '+', '0,2', '='], '1.3');
    runTest([1, '+', '+', 2, '='], '3.000');
    runTest([1, '+', 2, '+', 3, '+', 4, '='], '10.000');
    runTest([1, '+', 2, '*', 3, '='], '9.000');
    runTest(['1,1', '+', '2,2', '='], '3.300');
}

