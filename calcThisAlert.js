let calculator = {
	sum() {
  	return this.num1 + this.num2;
  },
  
  mul() {
  	return this.num1 * this.num2;
  },
  
  sub() {
  	return this.num1 - num2;
  },
  
  div() {
  	return this.num1 / this.num2;
  },
  
  exp() {
  	return this.num1 ** this.num2;
  },
  
  read() {
  	this.num1 = +prompt("Enter first number.");
    this.num2 = +prompt("Enter second number.");
  },
  
}

calculator.read();
alert( calculator.sum() );