'use strict';

const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'KhachHang';
const COLLECTION_NAME = 'KhachHangs';

// Declare the Schema of the Mongo model
const khachHangSchema = new Schema(
	{
		maKhachHang: { type: String, unique: true },
		maTiemChung: { type: String, unique: true },
		hoTen: { type: String, required: true },
		hoTenKhongDau: { type: String },
		ngaySinh: { type: Date, required: true },
		/**
		 * 0: nu
		 * 1: nam
		 * 2: khac
		 */
		gioiTinh: { type: Number, enum: [0, 1, 2] },
		danToc: { type: String, required: true },
		thuongTru: {
			tinhTP: { type: String },
			quanHuyen: { type: String },
			xaPhuong: { type: String },
			chiTiet: { type: String },
		},
		tamTru: {
			tinhTP: { type: String },
			quanHuyen: { type: String },
			xaPhuong: { type: String },
			chiTiet: { type: String },
		},
		dienThoai: { type: String, trim: true },
		email: { type: String, trim: true },
		cccd: { type: String, trim: true },
		ngheNghiep: { type: String },
		nguoiBaoHo: [
			{
				loai: { type: String },
				hoTen: { type: String },
				namSinh: { type: String },
				dienThoai: { type: String },
				cccd: { type: String, trim: true },
			},
		],
		ghiChu: { type: String },
		isDeleted: { type: Boolean, default: false },
		nguoiTao: { type: Types.ObjectId, ref: 'User' },
		nguoiCapNhat: { type: Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

khachHangSchema.index({
	maTiemChung: 'text',
	hoTen: 'text',
	dienThoai: 'text',
	cccd: 'text',
	isDeleted: 1,
});

// Them ma khach hang
khachHangSchema.pre('save', async function (next) {
	if (this.maKhachHang) next();

	const count = await model(DOCUMENT_NAME, khachHangSchema).countDocuments();
	this.maKhachHang = 'TC' + (100000000 + count + 1).toString();
	next();
});

//Export the model
module.exports = model(DOCUMENT_NAME, khachHangSchema);
