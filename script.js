let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('buttons'));
let operator = null;
let operand1 = null;
let operand2 = null;
let resultShown = false;

function clear() {
    display.value = "";
    operator = null;
    operand1 = null;
    operand2 = null;
    resultShown = false;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
    if(resultShown) {
        clear();
    }
    display.value += number;
}

function chooseOperation(oper) {
    if (!resultShown) {
        operator = oper;
        operand1 = parseFloat(display.value);
        display.value = "";
    }
}

function compute() {
    operand2 = parseFloat(display.value);
    if(operator === '/' && operand2 === 0) {
        display.value = 'Error: Divide by 0';
        operator = null;
        operand1 = null;
        operand2 = null;
        resultShown = true;
    } else {
        let result = eval(operand1 + ' ' + operator + ' ' + operand2);
        result = Math.round(result * 100) / 100;
        display.value = result;
        operator = null;
        operand1 = result;
        operand2 = null;
        resultShown = true;
    }
}

buttons.map( button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        if(resultShown && !isNaN(buttonText)){
            clear();
        }
        if(buttonText >= '0' && buttonText <= '9'){
            appendNumber(buttonText);
        } else if(buttonText === 'C'){
            clear();
        } else if(buttonText === 'Del'){
            deleteLast();
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
    console.log("Test 1 (5 + 3 = 8) Passed");

    // Test 2
    clear();
    appendNumber('6');
    chooseOperation('-');
    appendNumber('1');
    compute();
    console.assert(display.value == '5', "Test 2 (6 - 1 = 5) Failed");
    console.log("Test 2 (6 - 1 = 5) Passed");

    // Test 3
    clear();
    appendNumber('9');
    chooseOperation('/');
    appendNumber('0');
    compute();
    console.assert(display.value == 'Error: Divide by 0', "Test 3 (9 / 0 = Error: Divide by 0) Failed");
    console.log("Test 3 (9 / 0 = Error: Divide by 0) Passed");

    // Test 4
    clear();
    appendNumber('0.1');
    chooseOperation('+');
    appendNumber('0.2');
    compute();
    console.assert(display.value == '0.3', "Test 4 (0.1 + 0.2 = 0.3) Failed");
    console.log("Test 4 (0.1 + 0.2 = 0.3) Passed");

    console.log("All tests passed successfully!");
}