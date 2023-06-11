class Calculator {
  constructor() {
    this.display = document.getElementById("display");
    this.calculationDisplay = document.getElementById("calculation-display");
    this.buttonContainer = document.getElementsByClassName("buttons")[0];
    this.operations = new Operations(this.display, this.calculationDisplay);

    this.buttonValues = [
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

    this.buttonValues.forEach(buttonData => {
      const button = document.createElement("button");
      button.innerText = buttonData.value;
      button.classList.add(buttonData.class);
      button.addEventListener("click", this.handleButtonClick.bind(this));
      this.buttonContainer.appendChild(button);
    });

    window.addEventListener("keydown", (e) => {
      const key = e.key;
      if ((key >= "0" && key <= "9") || key === ".") {
        this.operations.appendNumber(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        this.operations.chooseOperation(key);
      } else if (key === "Escape") {
        this.operations.clear();
      } else if (key === "Enter" || key === "=") {
        this.operations.compute();
      }
    });
  }

  handleButtonClick(e) {
    const buttonValue = e.target.innerText;
    switch (buttonValue) {
      case "C":
        this.operations.clear();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.operations.chooseOperation(buttonValue);
        break;
      case "=":
        this.operations.compute();
        break;
      case ".":
        this.operations.appendNumber(buttonValue);
        break;
      case "-/+":
        this.operations.toggleSign();
        break;
      case "%":
        this.operations.percent();
        break;
      default:
        if (!isNaN(buttonValue)) {
          this.operations.appendNumber(buttonValue);
        }
        break;
    }
  }
}

const calculator = new Calculator();
