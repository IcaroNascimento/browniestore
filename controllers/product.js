const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (request, response, next, id) => {
	Product.findById(id).exec((error, product) => {
		if (error || !product) {
			return response.status(400).json({
				error: 'Product not found'
			});
		}
		request.product = product;
		next();
	});
};

exports.read = (request, response) => {
	request.product.photo = undefined;
	return response.json(request.product);
};

exports.create = (request, response) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(request, (error, fields, files) => {
		if (error) {
			return response.status(400).json({
				error: 'Image could not be uploaded'
			});
		}

		const { name, description, price, quantity, shipping } = fields;

		if (!name || !description || !price || !quantity || !shipping) {
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

exports.remove = (request, response) => {
	let product = request.product;
	product.remove((error, deletedProduct) => {
		if (error) {
			return response.status(400).json({
				error: errorHandler(error)
			});
		}
		response.json({
			message: 'Product deleted successfully'
		});
	});
};

exports.update = (request, response) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(request, (error, fields, files) => {
		if (error) {
			return response.status(400).json({
				error: 'Image could not be uploaded'
			});
		}

		const { name, description, price, quantity, shipping } = fields;

		if (!name || !description || !price || !quantity || !shipping) {
			return response.status(400).json({
				error: 'All fields are required'
			});
		}

		let product = request.product;
		product = _.extend(product, fields);

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

exports.list = (request, response) => {
	let order = request.query.order ? request.query.order : 'asc'
	let sortBy = request.query.sortBy ? request.query.sortBy : '_id'
	let limit = request.query.limit ? parseInt(request.query.limit) : 6

	Product.find()
		.select("-photo")
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((error, products) => {
			if(error){
				return response.status(400).json({
					error: 'Products not found'
				});
			}
			response.send(products)
		})

}

