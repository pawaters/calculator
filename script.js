let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('buttons'));
let operator = null;
let operand1 = null;
let operand2 = null;

buttons.map( button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        console.log(buttonText);
        if(buttonText >= '0' && buttonText <= '9'){
            if(display.value === null){
                display.value = buttonText;
            } else {
                display.value += buttonText;
            }
        } else if(buttonText === 'C'){
            display.value = "";
            operator = null;
            operand1 = null;
            operand2 = null;
        } else if(buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/'){
            operator = buttonText;
            operand1 = parseFloat(display.value);
            display.value = "";
        } else if(buttonText === '='){
            operand2 = parseFloat(display.value);
            let result = eval(operand1 + ' ' + operator + ' ' + operand2);
            display.value = result;
            operator = null;
            operand1 = result;
            operand2 = null;
        }
    });
});
