const linksTheme = document.querySelectorAll("input");
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const allClear = document.querySelector("[data-all-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");
const prevOperation = document.querySelector(".previous-operand");
const curOperation = document.querySelector(".current-operand");

let prevOperand = prevOperation.innerText;
let curOperand = curOperation.innerText;

let operation = undefined;
let result;

function changeTheme(index) {
  switch (index) {
    case 0:
      document.body.classList.remove("theme-two", "theme-three");
      break;
    case 1:
      document.body.classList.add("theme-two");
      document.body.classList.remove("theme-three");
      break;
    case 2:
      document.body.classList.add("theme-three");
      break;
  }
}

function appendNum(num) {
  if (num === "." && curOperand.includes(".")) return;
  curOperand = curOperand.toString() + num.toString();
}

function getOperation(value) {
  if (curOperand === "") return;
  if (prevOperand !== "") {
    calculate();
  }
  operation = value;
  prevOperand = curOperand;
  curOperand = "";
}

function calculate() {
  const prev = parseFloat(prevOperand);
  const cur = parseFloat(curOperand);
  if (isNaN(prev) || isNaN(cur)) return;
  switch (operation) {
    case "+":
      result = prev + cur;
      break;
    case "-":
      result = prev - cur;
      break;
    case "*":
      result = prev * cur;
      break;
    case "/":
      result = prev / cur;
      break;

    default:
      return;
  }
  curOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperation.innerText = "";
}

function updateDisplay() {
  curOperation.innerText = curOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperation.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperation.innerText = prevOperand;
  }
}

linksTheme.forEach((link, i) => {
  link.addEventListener("click", () => {
    changeTheme(i);
  });
});

numbers.forEach(btn => {
  btn.addEventListener("click", e => {
    appendNum(btn.innerText);
    updateDisplay();
  });
});

operations.forEach(btn => {
  btn.addEventListener("click", e => {
    getOperation(btn.innerText);
    updateDisplay();
  });
});

allClear.addEventListener("click", e => {
  prevOperand = "";
  curOperand = "";
  operation = undefined;
  updateDisplay();
});

delBtn.addEventListener("click", e => {
  curOperand = curOperand.toString().slice(0, -1);
  updateDisplay();
});

equalBtn.addEventListener("click", e => {
  calculate();
  updateDisplay();
});
