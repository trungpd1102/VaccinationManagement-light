'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		publicKey: {
			type: String,
			required: true,
		},
		privateKey: {
			type: String,
			required: true,
		},
		// nhung RT da duoc sudung
		refreshTokensUsed: {
			type: Array,
			default: [],
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

keyTokenSchema.index({
	user: 1,
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
