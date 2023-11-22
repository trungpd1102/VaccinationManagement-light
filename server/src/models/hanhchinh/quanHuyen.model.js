'use strict';

const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'QuanHuyen';
const COLLECTION_NAME = 'QuanHuyens';

// Declare the Schema of the Mongo model
const quanHuyenSchema = new Schema(
	{
		name: String,
		type: String,
		slug: String,
		name_with_type: String,
		path: String,
		path_with_type: String,
		code: { type: String, unique: true },
		parent_code: String,
	},
	{
		collection: COLLECTION_NAME,
	}
);

quanHuyenSchema.index({
	name: 'text',
	slug: 'text',
	code: 1,
});

//Export the model
module.exports = model(DOCUMENT_NAME, quanHuyenSchema);
