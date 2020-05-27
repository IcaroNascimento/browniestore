const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (request, response) => {
	console.log("request.body", request.body)
	const user = new User(request.body);
	user.save((error, user)=>{
		if (error){
			return response.status(400).json({
				error: errorHandler(error)
			})
		}
		user.salt = undefined
		user.hashed_password = undefined
		response.json({
			user 
		})
	})
};