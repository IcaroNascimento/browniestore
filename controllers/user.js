const User = require('../models/user');

exports.userById = (request, response, next, id) => {   
	User.findById(id).exec((error, user) => {
        if (error || !user) {
			return response.status(400).json({
				error: 'User not found'
			});
		}
        
		request.profile = user;
        next();
	});
};
