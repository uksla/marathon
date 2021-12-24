let firstNum = 0;
let currentNum = 0;
let result = 0;
let operator = undefined;
const isNull = null === currentNum;

import { UI_ELEMENTS } from "./view.js";

UI_ELEMENTS.deleteBtn.addEventListener("click", undo);
UI_ELEMENTS.clearBtn.addEventListener("click", clearDisplay);
UI_ELEMENTS.equalBtn.addEventListener("click", function () {
  Calc(operator, firstNum, currentNum);
})

function addNumListeners() {
  [].forEach.call(UI_ELEMENTS.numBtn, function (e) {
    e.addEventListener("click", numClick)
  })
}

function addOperListeners() {
  [].forEach.call(UI_ELEMENTS.operBtn, function (e) {
    e.addEventListener('click', operClick)
  });
}

function operClick() {
  saveFirstNum();
  console.log(firstNum);
  currentNum = 0;
  operator = this.textContent;
  console.log(operator)
}

function saveFirstNum() {
  return firstNum = currentNum
}

function resetDisplayInlineStyles() {
  UI_ELEMENTS.dispaly.setAttribute('style', '');
}

function checkLength() {
  if (UI_ELEMENTS.dispaly.textContent.length > 5) {
    UI_ELEMENTS.dispaly.style.fontSize = '36px';
    UI_ELEMENTS.dispaly.style.lineHeight = '3';
  } else {
    resetDisplayInlineStyles()
  }
}

function numClick() {
  isNull ? currentNum = 0 : (currentNum += this.textContent, update());
  checkLength();
  console.log(currentNum)
}

function undo() {
  currentNum = Math.trunc(currentNum / 10);
  update();
  checkLength();
}

function clearDisplay() {
  firstNum = 0;
  currentNum = 0;
  update();
  resetDisplayInlineStyles();
}

function update() {
  currentNum = Math.floor(100 * currentNum) / 100;
  changeDisplay(currentNum);
}

function changeDisplay(value) {
  UI_ELEMENTS.dispaly.textContent = value;
}

function Calc(operator, Num1, Num2) {

  if (checkCalc(operator, Num1, Num2) === true) {
    resultFn();
  } else {
    currentNum = 0;
    firstNum = 0;
    return UI_ELEMENTS.dispaly.textContent = 'Error'
  }

};

function checkCalc(operator, Num1, Num2) {
  const isInfinity = (Num2 === 0);

  if (isInfinity) {
    console.log("Error");
    return false;

  } else {
    return true;
  }

};

function resultFn() {
  currentNum = calculation(operator, firstNum, currentNum);
  result = currentNum;
  return UI_ELEMENTS.dispaly.textContent = currentNum;
}

function calculation(operator, Num1, Num2) {

  const operations = {
    '+': Num1 + Num2,
    '×': Num1 * Num2,
    '-': Num1 - Num2,
    '÷': Num1 / Num2,
  };

  if (operator in operations) {
    return operations[operator];
  }

}

window.onload = function () {
  addNumListeners();
  addOperListeners();
}



















// const result = operations[operator];
// return isFinite(result) ? result : "Error";