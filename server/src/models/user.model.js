'use strict';

const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		hoTen: {
			type: String,
		},
		hoTenKhongDau: {
			type: String,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		dienThoai: {
			type: String,
		},
		coSoTiemChung: {
			type: Types.ObjectId,
			ref: 'CoSoTiemChung',
		},
		kho: {
			type: Types.ObjectId,
			ref: 'DanhSachKho',
		},
		isActive: { type: Boolean, default: true },
		isDeleted: { type: Boolean, default: false },
		vaiTros: [
			{
				vaiTro: {
					type: Types.ObjectId,
					ref: 'VaiTro',
				},
			},
		],
		nguoiTao: { type: Types.ObjectId, ref: 'User' },
		nguoiCapNhat: { type: Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

userSchema.index({
	username: 'text',
	hoTenKhongDau: 'text',
	email: 'text',
	isDeleted: 1,
	isActive: 1,
});
//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
