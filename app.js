const express = require('express');
// load env variables
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// import mongoose
const mongoose = require('mongoose');

//db connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
	console.log(`DB connection error: ${err.message}`);
});

//routes
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
