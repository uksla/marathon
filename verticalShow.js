function showVerticalMessage(message) {
	
  if (message[0] === 'м') {
  	message = message[0].toUpperCase() + message.slice(1, 10);
  } else {
  		message = message.slice(0, 10);
  }
  
 	for (let char of message) {
  		console.log(char);
  	}
  	
}


showVerticalMessage('марафондлядрузей');