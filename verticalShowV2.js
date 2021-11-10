function showVerticalMessage(message) {
  const TOUPPERCASE = message[0].toUpperCase() + message.slice(1, 10);
  const MAXLENGTH = message.length > 10
  
  if (message[0] === 'м') {
    message = TOUPPERCASE;
  }
  
  if (MAXLENGTH) {
    message = message.slice(0, 10)
  }

   for (let char of message) {
      console.log(char);
    }
    
}



showVerticalMessage('марафондлядрузей');