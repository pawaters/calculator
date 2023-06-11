class Operations {
  constructor(display, calculationDisplay) {
    this.display = display;
    this.calculationDisplay = calculationDisplay;
    this.operator = null;
    this.currentResult = null;
    this.awaitingNextOperand = false;
    this.resultShown = false;
    this.resultShownCalcDisplay = false;
  }

  clear() {
    this.display.value = "";
    this.calculationDisplay.innerHTML = "";
    this.operator = null;
    this.currentResult = null;
    this.awaitingNextOperand = false;
    this.resultShown = false;
    this.resultShownCalcDisplay = false;
  }

  appendCalculationDisplay(value) {
    this.calculationDisplay.innerHTML += value;
  }

  updateCalculationDisplay(value) {
    this.calculationDisplay.innerHTML = value;
  }

  toggleSign() {
    if (this.resultShown) {
      this.currentResult = -this.currentResult;
      this.display.value = this.currentResult;
      this.calculationDisplay.innerHTML = this.currentResult;
    } else if (this.awaitingNextOperand === false) {
      if (this.display.value.startsWith("-")) {
        this.display.value = this.display.value.slice(1);
      } else {
        this.display.value = "-" + this.display.value;
      }
    }

    if (this.resultShownCalcDisplay) {
      this.updateCalculationDisplay(this.currentResult);
      this.resultShownCalcDisplay = false;
    } else if (this.awaitingNextOperand === false) {
      let lastNumberRegex = /(?:[+\-*/] )?([0-9.]+)$/;
      let match = this.calculationDisplay.innerHTML.match(lastNumberRegex);
      if (match) {
        let lastNumber = match[1];
        let newNumber = lastNumber.startsWith("-")
          ? lastNumber.slice(1)
          : "-" + lastNumber;
        this.calculationDisplay.innerHTML = this.calculationDisplay.innerHTML.replace(
          lastNumberRegex,
          newNumber
        );
      }
    }
  }

  percent() {
    if (this.awaitingNextOperand === false || this.resultShown) {
      this.display.value = parseFloat(this.display.value) / 100;
      this.currentResult = this.display.value;
      this.updateCalculationDisplay(this.display.value);
    }
  }

  appendNumber(number) {
    if (this.resultShownCalcDisplay) {
      this.calculationDisplay.innerHTML = "";
      this.resultShownCalcDisplay = false;
    }
    if (this.awaitingNextOperand || this.resultShown) {
      this.display.value = "";
      this.awaitingNextOperand = false;
      this.resultShown = false;
    }
    if (number === "." && this.display.value.includes(".")) return;
    this.display.value += number;
    this.appendCalculationDisplay(number);
  }

  performCalculation(operand) {
    this.currentResult = eval(this.currentResult + " " + this.operator + " " + operand);
    this.currentResult = Math.round(this.currentResult * 1000000000000) / 1000000000000;
    this.display.value = this.currentResult;
  }

  chooseOperation(oper) {
    if (this.awaitingNextOperand) {
      return;
    }
    if (this.resultShownCalcDisplay) {
      this.calculationDisplay.innerHTML = this.currentResult;
      this.resultShownCalcDisplay = false;
    }
    if (this.resultShown) {
      this.resultShown = false;
      this.operator = oper;
      this.awaitingNextOperand = true;
      this.appendCalculationDisplay(" " + this.operator + " ");
      return;
    }

    let operand = parseFloat(this.display.value);

    if (this.operator !== null && !this.awaitingNextOperand) {
      this.performCalculation(operand);
    } else {
      this.currentResult = operand;
    }

    this.awaitingNextOperand = true;
    this.operator = oper;
    this.appendCalculationDisplay(" " + this.operator + " ");
  }

  compute() {
    let operand = parseFloat(this.display.value);
    if (this.operator === null || this.awaitingNextOperand) {
      return;
    }
    if (this.operator === "/" && operand === 0) {
      this.display.value = "Error: Cannot Divide by 0";
      this.operator = null;
      this.currentResult = null;
      this.awaitingNextOperand = false;
      return;
    }
    this.performCalculation(operand);
    this.operator = null;
    this.awaitingNextOperand = false;
    this.resultShown = true;
    this.resultShownCalcDisplay = true;
  }
}
