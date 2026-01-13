let operator = "";
  let operatorinput = false;
let hasOperated = false;
let hasdecimal = false;
  let completedecimal = true;
let numbers = document.querySelectorAll("div.number");
let signs = document.querySelectorAll("div.operator");
let keys = document.querySelectorAll("div.button");
let equal = document.querySelector("div#equal");
let backspace = document.querySelector("div#delete");
let ac = document.querySelector("div#ac");
let period = document.querySelector("div#period");
let input = document.querySelector("div#inputscreen");
let result = document.querySelector("div#resultscreen");

/*
Problem: When deleting a decimal point and then imputting an operation, the operation will believe
that it's already been written, acting as a delete button and disabling the equal sign. It's
possible to read through the logic and fix it easily, but going case-by-case on the entire
codebase until new bugs are found is unsustainable and inefficient. As such, the entire
codebase will be rebuilt with decimals in mind.

PROCEDURE STARTING STATE:
Input = ""
Output = 0

Behavior outline:
- There are only two states acceptable for the equal sign: one number, two numbers and an operator.
In any other case, the equal sign should fail
- If an operation or decimal point is used on this state, it should generate a 0 to its left
- Decimal points should only be able to be written twice, once before and once after an operation
is written
- Operations should only be able to be written once
- Operations should not be writable when a decimal is the last digit
*/

function equals () {
  let values = input.textContent.split(operator);
  if (((values[0] != "" && operator === "") || (operator != "" && values[1] != "")) && completedecimal) {
    results = operate(parseFloat(values[0]), operator, parseFloat(values[1]));
    if (results > 99999999) {
      result.textContent = (Math.round((results) * 10000) / 10000).toExponential(3)
    } else {
      result.textContent = Math.round((results) * 10000) / 10000
    };
    input.textContent = "";
    operator = "";
    hasOperated = false;
    hasdecimal = false;
    operatorinput = false;
    equal.style.color = "#000";
  } else {
    equal.style.color = "#922";
  }
};

for (button of signs) {
  let content = button;
  button.addEventListener("click", () => {
    if (operatorinput && hasOperated === true && completedecimal) {
      equals();
      input.textContent = result.textContent;
    }
    if (!operatorinput && input.textContent === "") {
      input.textContent += "0";
    };
    if (hasdecimal && !completedecimal) {
      input.textContent += "0";
      completedecimal = true;
    }
    operator = content.textContent;
    operatorless = input.textContent.slice(0, input.textContent.length - 1);
    if ((operatorinput && hasOperated === false)) {
      input.textContent = operatorless;
      //This doesn't fire
    }
    operatorinput = true;
    hasdecimal = false;
    //Now it does
  }
)};

for (button of keys) {
  let content = button;
  if (button.classList.contains("number")) {
    button.addEventListener("click", () => {
      input.textContent += content.textContent;
    });
  }
  if (button.classList.contains("operator")) {
    button.addEventListener("click", () => {
      input.textContent += content.textContent;
    });
  }
};

for (button of numbers) {
  button.addEventListener("click", () => {
    if (operatorinput && !button.classList.contains("operator")) {
      hasOperated = true;
    }
    if (hasdecimal && button.id != "period") {
      completedecimal = true;
    }
    console.log(operator);
    console.log(operatorinput);
    console.log(hasOperated);
    console.log(hasdecimal);
    console.log(completedecimal);
  })
};

ac.addEventListener("click", () => {
  operator = "";
  operatorinput = false;
  hasOperated = false;
  hasdecimal = false;
  completedecimal = true;
  input.textContent = "";
  result.textContent = "0";
});

backspace.addEventListener("click", () => {
  inputlen = input.textContent.length;
  back = input.textContent.slice(0, inputlen - 1);
  perioddetect = input.textContent.slice(inputlen - 2, inputlen - 1);
  console.log(perioddetect);
  deleted = input.textContent.slice(inputlen - 1, inputlen);
  if (deleted === "+" || deleted === "-" || deleted === "*" || deleted === "/" || deleted === "^") {
    operator = "";
    operatorinput = false;
    hasOperated = false;
  }
  if (deleted === ".") {
    hasdecimal = false;
    completedecimal = true;
  }
  if (perioddetect === ".") {
    completedecimal = false;
  }
  input.textContent = back;
})

period.addEventListener("click", () => {
  let values = input.textContent.split(operator);
  if (!hasdecimal) {
    if ((values[0] === undefined && operator === "") || (operator != "" && values[1] === "")) {
      input.textContent += 0;
    }
    input.textContent += ".";
    hasdecimal = true;
    completedecimal = false;
  }
});

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
  if (num2 != 0) {
    return num1 / num2;
  } else {
    return "No.";
  }
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
    case "":
      if (input.textContent != "") {
        return input.textContent;
      } else {
        return 0;
      }
  };
};