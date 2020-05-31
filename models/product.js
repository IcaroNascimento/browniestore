const mongoose = require('mongoose');
const {ObjectID} = mongoose.Schema

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32
		},
        description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000
		},
        price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 2000
		},
        quantity: {
			type: Number,
		},
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            required: false,
            type: Boolean,
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
