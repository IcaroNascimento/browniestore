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
exports.read = (request, response) => {
	request.profile.hashed_password = undefined;
	request.profile.salt = undefined;
	return response.json(request.profile);
};

exports.update = (request, response) => {
	User.findOneAndUpdate({ _id: request.profile._id }, { $set: request.body }, { new: true }, (error, user) => {
		if (error) {
			return response.status(400).json({
				error: 'You are not authorized to perform this action'
			});
		}
		user.hashed_password = undefined;
		user.salt = undefined;
		response.json(user);
	});
};
