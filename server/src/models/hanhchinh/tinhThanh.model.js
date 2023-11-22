'use strict';

const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'TinhThanh';
const COLLECTION_NAME = 'TinhThanhs';

// Declare the Schema of the Mongo model
const tinhThanhSchema = new Schema(
	{
		name: String,
		slug: String,
		type: String,
		name_with_type: String,
		code: { type: String, unique: true },
	},
	{
		collection: COLLECTION_NAME,
	}
);

tinhThanhSchema.index({
	name: 'text',
	slug: 'text',
	code: 1,
});

//Export the model
module.exports = model(DOCUMENT_NAME, tinhThanhSchema);
