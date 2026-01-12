let operator = "";
  let operatorinput = false;
let hasOperated = false;
let numbers = document.querySelectorAll("div.number");
let signs = document.querySelectorAll("div.operator");
let keys = document.querySelectorAll("div.button");
let equal = document.querySelector("div#equal");
let input = document.querySelector("div#inputscreen");
let result = document.querySelector("div#resultscreen");

function equals () {
  let values = input.textContent.split(operator);
  console.log(`${values[0]} ${operator} ${values[1]}`)
  result.textContent = operate(parseFloat(values[0]), operator, parseFloat(values[1]));
  input.textContent = "";
  operator = "";
  hasOperated = false;
  operatorinput = false;
};

for (button of signs) {
  let content = button;
  button.addEventListener("click", () => {
    if (operatorinput && hasOperated === true) {
      equals();
      input.textContent = result.textContent;
    }
    operator = content.textContent;
    operatorless = input.textContent.slice(0, input.textContent.length - 1);
    if (operatorinput && hasOperated === false) {
      input.textContent = operatorless;
    }
    operatorinput = true;
  }
)};


for (button of keys) {
  let content = button;
  button.addEventListener("click", () => {
    input.textContent += content.textContent;
  });
};

for (button of numbers) {
  let content = button;
  button.addEventListener("click", () => {
    if (operatorinput && !button.classList.contains("operator")) {
      hasOperated = true;
    }
})};
/*
Pass a number, an operator, and a second number to a function

- Wait for user to input a number into the calculator
- If the user inputs a number, they may input an o9+perator
  - If the user hasn't input a number, fill the input with the result's number (starts at 0)
- If the user inputs an operator, set number1 = the number on the input and operator to the
selected operator
  - If another operator is selected again, replace the operator with the new one
- After = is selected, set all that's to the right of the operator to hasOperated
- Use the correct operation function on these values
- Set all variables to 0, input screen to "", and result screen to 0 when AC is pressed
*/

equal.addEventListener("click", equals); 

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mult(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function raise(num1, num2) {
  return Math.pow(num1, num2);
}

function operate(num1, op, num2) {
  switch(op) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mult(num1, num2);
    case "/":
      return divide(num1, num2);
    case "^":
      return raise(num1, num2);
  };
}