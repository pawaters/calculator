
document.getElementById("test-button").addEventListener("click", runTests, handleTests);
document.getElementById("clear-test-button").addEventListener("click", clearTests);

function handleTests() {
    let testButton = document.getElementById('test-button');
    let clearTestButton = document.getElementById('clear-test-button');
    if (testButton.style.display !== 'none') {
        runTests();
        testButton.style.display = 'none';
        clearTestButton.style.display = 'inline-block';
    } 
}

function clearTests() {
    let testButton = document.getElementById('test-button');
    let clearTestButton = document.getElementById('clear-test-button');
    let testTable = document.getElementById('test-table');
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; 
    testTable.style.display = "none"; 
    clearTestButton.style.display = 'none';
    testButton.style.display = 'inline-block';
}
function runTest(commands, expectedResult) {
  clear();
  let testDescription = "";

  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];

    if (typeof command === "number" || command.includes(".")) {
      appendNumber(command.toString());
      testDescription += command.toString();
    } else {
      switch (command) {
        case "+":
        case "-":
        case "*":
        case "/":
          chooseOperation(command);
          testDescription += " " + command + " ";
          break;
        case "=":
          compute();
          testDescription += " " + command + " ";
          break;
        case "-/+":
          toggleSign();
          testDescription += " " + command + " ";
          break;
        case "%":
          percent();
          testDescription += " " + command + " ";
          break;
        default:
          console.error(`Unknown command: ${command}`);
      }
    }
  }

  const result = display.value == expectedResult ? "Passed" : "Failed";
  let tableBody = document.getElementById("table-body");
  let row = tableBody.insertRow();
  row.insertCell(0).innerHTML = testDescription;
  row.insertCell(1).innerHTML = expectedResult;
  row.insertCell(2).innerHTML = display.value;
  row.insertCell(3).innerHTML = result;
  clear();
}


function runTests() {
  let testTable = document.getElementById("test-table");
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  testTable.style.display = "block";
  runTest([4, "+", 2, "-", 2, "/", 4, "*", 2, "="], "2");
  runTest([4, "-/+", "+", 2, "="], "-2");
  runTest(["2.0001", "+", "1.0001", "="], "3.0002");
  runTest([8, "%", "=", "*", 2, "="], "0.16");
  runTest([1, "/", 0, "="], "Error: Cannot Divide by 0");
  runTest([1, "+", "0.1", "=", "+", "0.2", "="], "1.3");
  runTest([1, "+", "+", 2, "="], "3");
  runTest([1, "+", 2, "+", 3, "+", 4, "="], "10");
  runTest([1, "+", 2, "*", 3, "="], "9");
  runTest(["1.1", "+", "2.2", "="], "3.3");
  runTest([100, "+", "%", 200, "="], "300");
  runTest([100, "+", 200, "=", "%"], "3");
  runTest([100, "+", "-/+", 200, "="], "300");
  runTest([100, "-/+", "+", "-/+", 200, "="], "100");
  runTest([100, "+", 200, "=", "-/+"], "-300");
  runTest([10, "/", 3, "="], "3.333333333333");
  runTest([10000000000, "*", 1000000000, "="], "10000000000000000000");
  runTest([1, "/", 1000000000000, "="], "1e-12");
  runTest([100, "+", 200, "=", "%"], "3");
}
