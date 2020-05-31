const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (request, response) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(request, (error, fields, files) => {
		if (error) {
			return response.status(400).json({
				error: 'Image could not be uploaded'
			});
		}

		const { name, description, price, quantity, photo, shipping } = fields;

		if (!name || !description || !price || !quantity || !photo || !shipping) {
			return response.status(400).json({
				error: 'All fields are required'
			});
		}

		let product = new Product(fields);

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return response.status(400).json({
					error: 'Image should be less than 1mb in size'
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((error, result) => {
			if (error) {
				return response.status(400).json({
					error: errorHandler(error)
				});
			}
			response.json(result);
		});
	});
};
