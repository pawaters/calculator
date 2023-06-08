let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('buttons'));
let operator = null;
let currentResult = null;
let awaitingNextOperand = false;
let resultShown = false;

function clear() {
    display.value = "";
    operator = null;
    currentResult = null;
    awaitingNextOperand = false;
    resultShown = false;
}

function appendNumber(number) {
    if(awaitingNextOperand || resultShown) {
        display.value = '';
        awaitingNextOperand = false;
        resultShown = false;
    }
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
        currentResult = Math.round(currentResult * 100) / 100;
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
    currentResult = Math.round(currentResult * 1000) / 1000;
    display.value = currentResult;
    operator = null;
    awaitingNextOperand = false;
    resultShown = true;
}

buttons.map( button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        if(buttonText >= '0' && buttonText <= '9'){
            appendNumber(buttonText);
        } else if(buttonText === 'C'){
            clear();
        } else if(buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/'){
            chooseOperation(buttonText);
        } else if(buttonText === '='){
            compute();
        }
    });
});

// TESTS
document.getElementById('test-button').addEventListener('click', runTests);

function runTests() {
    // Test 1
    clear();
    appendNumber('5');
    chooseOperation('+');
    appendNumber('3');
    compute();
    console.assert(display.value == '8', "Test 1 (5 + 3 = 8) Failed");
    console.log("Test 1 (5 + 3 = 8) Passed (if no error message)");

    // Test 2
    clear();
    appendNumber('6');
    chooseOperation('-');
    appendNumber('1');
    compute();
    console.assert(display.value == '5', "Test 2 (6 - 1 = 5) Failed");
    console.log("Test 2 (6 - 1 = 5) Passed (if no error message)");

    // Test 3
    clear();
    appendNumber('9');
    chooseOperation('/');
    appendNumber('0');
    compute();
    console.assert(display.value == 'Error: Cannot Divide by 0', "Test 3 (9 / 0 = Error: Cannot Divide by 0) Failed");
    console.log("Test 3 (9 / 0 = Error: Cannot Divide by 0) Passed (if no error message)");

    // Test 4
    clear();
    appendNumber('10');
    chooseOperation('/');
    appendNumber('3');
    compute();
    console.assert(display.value == '3.333', "Test 4 (10 + 3 = 3.333) Failed");
    console.log("Test 4 (10 + 3 = 3.333) Passed (if no error message)");

     // Test 5
     clear();
     appendNumber('100000000');
     chooseOperation('*');
     appendNumber('100000000');
     compute();
     console.assert(display.value == '10000000000000000', "Test 5 (100000000 * 100000000 = 10000000000000000) Failed");
     console.log("Test 5 (100000000 * 100000000 = 10000000000000000) Passed (if no error message)");

    clear();
}