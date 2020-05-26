const user = require('../models/user')

exports.signup = (request, response) => {
	console.log("request.body", request.body)
	const user = new User(request.body);
	user.save((error, user)=>{
		if (error){
			return response.status(400).json({
				error
			})
		}
		response.json({
			user 
		})
	})
};