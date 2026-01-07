let number1 = 0;
let operator = "";
let number2 = 0;
let buttons = document.querySelectorAll("div.number");
console.log(document.querySelector("div#resultscreen").textContent);

for (button of buttons) {
  let content = button;
  button.addEventListener("click", () => {
    document.querySelector("div#inputscreen").textContent += content.textContent;
  });
}

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
  };
}