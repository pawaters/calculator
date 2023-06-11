class Tests {
  constructor() {
    this.testTable = document.getElementById("test-table");
    this.tableBody = document.getElementById("table-body");
    this.testButton = document.getElementById("test-button");
    this.clearTestButton = document.getElementById("clear-test-button");
    this.testButton.addEventListener("click", this.runTests.bind(this));
    this.clearTestButton.addEventListener("click", this.clearTests.bind(this));
  }

  handleTests() {
    if (this.testButton.style.display !== "none") {
      this.runTests();
      this.testButton.style.display = "none";
      this.clearTestButton.style.display = "inline-block";
    }
  }

  clearTests() {
    this.tableBody.innerHTML = "";
    this.testTable.style.display = "none";
    this.clearTestButton.style.display = "none";
    this.testButton.style.display = "inline-block";
  }

  runTest(commands, expectedResult) {
    Operations.clear();
    let testDescription = "";

    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];

      if (typeof command === "number" || command.includes(".")) {
        Operations.appendNumber(command.toString());
        testDescription += command.toString();
      } else {
        switch (command) {
          case "+":
          case "-":
          case "*":
          case "/":
            Operations.chooseOperation(command);
            testDescription += " " + command + " ";
            break;
          case "=":
            Operations.compute();
            testDescription += " " + command + " ";
            break;
          case "-/+":
            Operations.toggleSign();
            testDescription += " " + command + " ";
            break;
          case "%":
            Operations.percent();
            testDescription += " " + command + " ";
            break;
          default:
            console.error(`Unknown command: ${command}`);
        }
      }
    }

    const result = display.value == expectedResult ? "Passed" : "Failed";
    let row = this.tableBody.insertRow();
    row.insertCell(0).innerHTML = testDescription;
    row.insertCell(1).innerHTML = expectedResult;
    row.insertCell(2).innerHTML = display.value;
    row.insertCell(3).innerHTML = result;
    Operations.clear();
  }

  runTests() {
    this.tableBody.innerHTML = "";
    this.testTable.style.display = "block";
    this.runTest([4, "+", 2, "-", 2, "/", 4, "*", 2, "="], "2");
    this.runTest([4, "-/+", "+", 2, "="], "-2");
    this.runTest(["2.0001", "+", "1.0001", "="], "3.0002");
    this.runTest([8, "%", "=", "*", 2, "="], "0.16");
    this.runTest([1, "/", 0, "="], "Error: Cannot Divide by 0");
    this.runTest([1, "+", "0.1", "=", "+", "0.2", "="], "1.3");
    this.runTest([1, "+", "+", 2, "="], "3");
    this.runTest([1, "+", 2, "+", 3, "+", 4, "="], "10");
    this.runTest([1, "+", 2, "*", 3, "="], "9");
    this.runTest(["1.1", "+", "2.2", "="], "3.3");
    this.runTest([100, "+", "%", 200, "="], "300");
    this.runTest([100, "+", 200, "=", "%"], "3");
    this.runTest([100, "+", "-/+", 200, "="], "300");
    this.runTest([100, "+", 200, "=", "-/+"], "-300");
    this.runTest([10, "/", 3, "="], "3.333333333333");
    this.runTest([10000000000, "*", 1000000000, "="], "10000000000000000000");
    this.runTest([1, "/", 1000000000000, "="], "1e-12");
    this.runTest([100, "+", 200, "=", "%"], "3");
  }
}

const tests = new Tests();

document.getElementById("test-button").addEventListener("click", tests.runTests.bind(tests));
document.getElementById("clear-test-button").addEventListener("click", tests.clearTests.bind(tests));
