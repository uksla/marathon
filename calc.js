function Calc(operation, Num1, Num2) {
	let opList = "add | multi | divide | subtract | divide | exp";
  
	if (operation == 'add') {
  	return Num1 + Num2
  } else if (operation == 'subtract') {
  	return Num1 - Num2
  } else if (operation == 'multi') {
  	return Num1 * Num2
  } else if (operation == 'divide') {
  	return Num1 / Num2
  } else if (operation == 'exp') {
  	return Num1 ** Num2
  } else if ((Num1 == "") || (Num2 == "") || (typeof Num1 != Number)) {
  	console.log('Error');
  } else if (operation == "") {
  	console.log("Unknown operation! Try some of these:" + opList)
  }
};

console.log(Calc('exp', 4, 2));