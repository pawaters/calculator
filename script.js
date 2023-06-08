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
const resultDiv = document.getElementById('test-results');  

function runTests() {
    resultDiv.innerHTML = "";  

    // Test 1
    runTest('5', '+', '3', '8', "Test 1 (5 + 3 = 8)");

    // Test 2
    runTest('6', '-', '1', '5', "Test 2 (6 - 1 = 5)");

    // Test 3
    runTest('9', '/', '0', 'Error: Cannot Divide by 0', "Test 3 (9 / 0 = Error: Cannot Divide by 0)");

    // Test 4
    runTest('10', '/', '3', '3.333333333333', "Test 4 (10 / 3 = 3.333333333333). I went for 12 decimals max to avoid strange behaviors beyond that level.");

    // Test 5
    runTest('100000000', '*', '100000000', '10000000000000000', "Test 5 (100000000 * 100000000 = 10000000000000000)");

    clear();
}

function runTest(num1, operator, num2, expectedResult, testDescription) {
    clear();
    appendNumber(num1);
    chooseOperation(operator);
    appendNumber(num2);
    compute();
    const result = display.value == expectedResult ? "Passed" : "Failed";
    resultDiv.innerHTML += `${testDescription} --> ${result}<br>`;
}