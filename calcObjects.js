function Calc(operation, Num1, Num2) {

  if (checkCalc(operation, Num1, Num2) === true) {
    return calculation(operation, Num1, Num2);
  } 
};


function checkCalc(operation, Num1, Num2) {
  const isNotValid = (!Num1 || Num1 === undefined || !operation || !Num2);
  const isNaN = (typeof Num1 != "number") || (typeof Num2 != "number");
  const isInfinity = (Num2 === 0);
  
  if (isNotValid) {
    console.log("Error.");
  } else if (isNaN) {
      console.log("It is not a number! Try to enter some numbers.");
  } else if (isInfinity) {
      console.log("Error, the program can't divide by '0'");
  } else {
      return true;
    }     
};


function calculation(operation, Num1, Num2) {
  const operations = {
    sum: Num1 + Num2,
    multi: Num1 * Num2,
    subtract: Num1 - Num2,
    divide: Num1 / Num2,
    exp: Num1 ** Num2,
  };
  
  if (operation in operations) {
    return operations[operation];
  } else {
      console.log("Error, unknown operation") 
  }
}

console.log(Calc('multsi', 10 , 2));