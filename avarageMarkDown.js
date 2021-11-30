function getAverage(marks) {
	  
	function calcSum() {
    	let sum = 0;

     	for (let i = 0; i < marks.length; i++){
        	sum += marks[i]
     	}

     	return sum
  };
  
  result = Math.floor(calcSum() /marks.length);
  return result;
  
};

console.log(getAverage([4, 4, 3, 3, 4, 4, 4, 5, 5]))