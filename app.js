const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();

//import routes
const userRoutes = require('./routes/user');


//app
const app = express();


// database conection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
	console.log(`DB connection error: ${err.message}`);
});

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())


//routes middlewares
app.use('/api',userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(
		`Server is running on port ${port} 
Click here http://localhost:8000/api to entry point or put this url in your browser`
	);
});
