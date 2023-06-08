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

function chooseOperation(operation) {
    operator = operation;
    operand1 = parseFloat(display.value);
    display.value = "";
}

function compute() {
    operand2 = parseFloat(display.value);
    let result = eval(operand1 + ' ' + operator + ' ' + operand2);
    display.value = result;
    operator = null;
    operand1 = result;
    operand2 = null;
    resultShown = true;
}

buttons.map( button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
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

