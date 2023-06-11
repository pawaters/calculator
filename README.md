# Assignment instructions:

- Implement a simple calculator app that can perform sum, subtract, multiply and division calculations.
- Use HTML5/CSS/JavaScript for the implementation.
- Pay attention to reusable and clean code, and practical and purposeful UI.
- Optional task: plan sufficient test cases to cover the application on a reasonable level.

## Calculator features.

- download and unzip file, double-click on html file (tested on chrome, firefox and safari),
- perform sum, substract, multiply and divide,
- the UI approach and buttons I used are based on the iphone calculator, when held in portrait, which I assume is the most used "simple calculator" in the world. From that design, I added one useful thing: The top "calculation display" that shows on top of the result the sequence of operations you just did.
- layout is responsive with a special simplified UI for mobile sizes (the header, footer and tests will appear only if width super to 600px)
- you can either type or press the buttons,
- the colors, font and style is based on Neomore's web,
- only used vanilla HTML5/CSS/JavaScript for the implementation. no libraries or frameworks to show more coding. 
- can keep adding operands, not limited to 1, 2 or 3.
- can press on "=", then if choose an operand the calculation continues
- if divides by = 0, Error message appears "Error: Cannot Divide by 0"
- decimals: up to 12 decimals, as from 14 decimals we have observed some strange behaviors in some cases. It is apparently inherent to computers and its management of floats after some research.
- upper limit: from e+80, or 10^80, the last integer before the exponent of 10 again has some similar weird behavior as when asking for 12+ decimals.
- automated testing by pressing on the button "Run Tests" below the calculator, unless you are on mobile size where it disappears for usability/responsiveness reasons

## Clean and reusable code

Here are the principles I followed:
- readable & self-explanatory
- DRY
- Error handling
- Automated testing
- consistency
- single responsibility
- modularity
- use of version control systems

I initially started with a functional approach, as it was a simple calculator.
However, after testing, it seemed that refactoring so with a OOP approach and 3 clear classes made it cleaner: Calculator, Operations and Tests.
Calculator and Tests requires the use of the Operation class.
All the classes assume the existence of the key HTML elements.
The HTML was built in a way to let for dynamic generation of the buttons as well as encapsulating elements within clear parents.

To check for all that, I reviewed my code and used Eslint, as well as Prettier for formatting. 
Each function is nearly always less than 25 lines.
I decided to keep all JS in one file given the simplicity of the project.

## Bonus: Automated testing and recommended test cases

Click the "Run Tests" button and the results will be displayed. They cover:

- each operation and operand,
- divived by 0 error case, as well as dividing 10 by 3 and checking for the max number of decimals, as well as multiplying 2 big numbers.
- I have created a runTest() function which you can easily adapt. Its limitation is that it is made for one operand, and does not test the UI of course.
we also checked during all tests that no console error came up.

As for manual tests to check the approach of clicking on buttons or typing directly, I recommend following the list of automated tests operations.

## Things I would improve for a bigger project

- designed the HTML in as similar fashion to REACT, where each UI part is a module, and the 3 classes I defined would refer to parameters like "calculatorUI", "button", and keep it more modular on the UI side.
- Add a "del" button that works in all situations. I had started to implement it, but it would need some refactoring of the whole JS to work with a variety of edge cases without bugs. Also, it was not included in the iphone calculator and estimated that it was therefore out of scope for a "simple calculator".
- add all the buttons of the iphone calculator but when held in paysage.
