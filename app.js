const express = require('express');
const app = express();

require('dotenv').config();

app.get('/', (request, response) => {
	response.send('Hello from node');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(
    `Server is running on port ${port} 
Click here http://localhost:8000 or put this url in your browser`
  );
});
