const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (request, response) => {
	console.log('request.body', request.body);
	const user = new User(request.body);
	user.save((error, user) => {
		if (error) {
			return response.status(400).json({
				error: errorHandler(error)
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined;
		response.json({
			user
		});
	});
};

exports.signin = (request, response) => {
	//find the user based on email
	const { email, password } = request.body;
	User.findOne({ email }, (error, user) => {
		if (error || !user) {
			return response.status(400).json({
				error: 'User with that email does not exist. Please signup'
			});
		}
		// if user is found make sure the email and password match
		// create authenticate  method in user model
		if (!user.authenticate(password)) {
			return response.status(401).json({
				error: 'Email and password dont match'
			});
		}
		//generated  a signed token with user id and secret

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		//persist the token as 't' in cookie with expiry date
		response.cookie('t', token, { expire: new Date() + 9999 });
		//return response with user and token to frontend client
		const { _id, name, email, role } = user;
		return response.json({ token, user: { _id, email, name, role } });
	});
};

exports.signout = (request, response) => {
	response.clearCookie('t');
	response.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
});

exports.isAuth = (request, response, next) => {
	let user = request.profile && request.auth && request.profile._id == request.auth._id;
	if (!user) {
		return response.status(403).json({
			error: 'Access denied'
		});
	}
	next();
};

exports.isAdmin = (request, response, next) => {
	if (request.profile.role === 0) {
		return response.status(403).json({
			error: 'Admin resource! Access denied'
		});
	}
	next();
};
