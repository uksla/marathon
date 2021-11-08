function Calc(operation, Num1, Num2) {
  
  if (checkCalc(operation, Num1, Num2) === false) {
    return calculation(operation, Num1, Num2);
  }
  
};


function checkCalc(operation, Num1, Num2) {
  let opList = ['add', 'multi', 'subtract', 'divide', 'exp'];
  const isNotValid = (!Num1 || Num1 === undefined || !operation || !Num2);
  const isNaN = (typeof Num1 != "number") || (typeof Num2 != "number");
/*  const isNotInfinity = (Num2 === 0) || (Num2 === null); */
  
  if (isNotValid) {
    console.log("Error.");
  } else if (isNaN) {
      console.log("It is not a number! Try to enter some numbers.")
  /* } else if (isNotInfinity) {
    console.log("Error, you cant divide by zero!"); */
  } else if (!opList.includes(operation)) {
    console.log("Unknown operation! Try some of these: " + opList);
  } else {
    return false;
  }
 }
  
  function calculation(operation, Num1, Num2) {
    switch (operation) {
      case 'add':
        return `Result: ${Num1 + Num2}`;
      
      case 'subtract':
        return `Result: ${Num1 - Num2}`;
        
      case 'multi':
        return `Result: ${Num1 * Num2}`;
        
      case 'divide':
        return `Result: ${Num1 / Num2}`;
        
      case 'exp':
        return `Result: ${Num1 ** Num2}`;
    }
  }

console.log(Calc('expd', 10 , 2));