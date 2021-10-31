function Calc(operation, Num1, Num2) {
  let opList = ['add', 'multi', 'divide', 'subtract', 'divide', 'exp'];
  
  if (!operation || Num1 === undefined || !Num2) {
    console.log('Error');
 }  else if (!opList.includes(operation)) {
      console.log("Unknown operation! Try some of these: " + opList);
  } else if (operation == 'add') {
      return Num1 + Num2;
  } else if (operation == 'subtract') {
      return Num1 - Num2;
  } else if (operation == 'multi') {
      return Num1 * Num2;
  } else if (operation == 'divide') {
      return Num1 / Num2;
  } else if (operation == 'exp') {
      return Num1 ** Num2;
  }
};

console.log(Calc('add', 4, 2));
