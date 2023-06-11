let display = document.getElementById("display"); 
let calculationDisplay = document.getElementById("calculation-display");
let buttons = Array.from(document.getElementsByClassName("buttons"));

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