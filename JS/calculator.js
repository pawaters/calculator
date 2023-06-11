let display = document.getElementById("display"); 
let calculationDisplay = document.getElementById("calculation-display");
let buttonContainer = document.getElementsByClassName("buttons")[0];

const buttonValues = [
  { class: 'digit', value: '1' },
  { class: 'digit', value: '2' },
  { class: 'digit', value: '3' },
  { class: 'operator', value: '+' },
  { class: 'digit', value: '4' },
  { class: 'digit', value: '5' },
  { class: 'digit', value: '6' },
  { class: 'operator', value: '-' },
  { class: 'digit', value: '7' },
  { class: 'digit', value: '8' },
  { class: 'digit', value: '9' },
  { class: 'operator', value: '*' },
  { class: 'clear', value: 'C' },
  { class: 'digit', value: '0' },
  { class: 'digit', value: '.' },
  { class: 'operator', value: '/' },
  { class: 'equal', value: '=' },
  { class: 'operator', value: '-/+' },
  { class: 'operator', value: '%' },
];

buttonValues.forEach(buttonData => {
  const button = document.createElement("button");
  button.innerText = buttonData.value;
  button.classList.add(buttonData.class);
  button.addEventListener("click", handleButtonClick);
  buttonContainer.appendChild(button);
});

function handleButtonClick(e) {
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