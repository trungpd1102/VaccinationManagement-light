'use strict';

const khachHangModel = require('../models/khachHang.model');
const {
	findAllPaginated,
	searchPaginated,
	safetyDelete,
	searchNangCaoPaginated,
} = require('../models/repositories/base.repo');
const { removeAccents } = require('../utils/removeAccent');

class KhachHangFactory {
	static async createKhachHang(payload) {
		return new KhachHang(payload).create();
	}

	static async getPaginatedKhachHangs({ page, limit }) {
		return await findAllPaginated({ model: khachHangModel, page, limit });
	}

	static async searchKhachHangs({ keySearch, page, limit }) {
		return await searchPaginated({
			model: khachHangModel,
			keySearch,
			page,
			limit,
		});
	}
	static async searchNangCaoPaginated({ keySearch, page, limit, ngaySinhFrom, ngaySinhTo }) {
		return await searchNangCaoPaginated({
			model: khachHangModel,
			keySearch,
			page,
			limit,
			ngaySinhFrom,
			ngaySinhTo,
		});
	}

	static async updateKhachHang({ id, bodyUpdate }) {
		return new KhachHang(bodyUpdate).update({ id });
	}

	static async deleteKhachHang({ id }) {
		return safetyDelete({ model: khachHangModel, id });
	}

	static async insertFieldIntoKhachHangs({ query, update }) {
		return khachHangModel.updateMany(query, { $set: update });
	}
}

class KhachHang {
	constructor({
		maTiemChung,
		hoTen,
		ngaySinh,
		gioiTinh,
		danToc,
		thuongTru,
		tamTru,
		dienThoai,
		email,
		cccd,
		ngheNghiep,
		nguoiBaoHo,
		ghiChu,
		nguoiTao,
		nguoiCapNhat,
	}) {
		this.maTiemChung = maTiemChung;
		this.hoTen = hoTen;
		this.hoTenKhongDau = removeAccents(hoTen);
		this.ngaySinh = ngaySinh;
		this.gioiTinh = gioiTinh;
		this.danToc = danToc;
		this.thuongTru = thuongTru;
		this.tamTru = tamTru;
		this.dienThoai = dienThoai;
		this.email = email;
		this.cccd = cccd;
		this.ngheNghiep = ngheNghiep;
		this.nguoiBaoHo = nguoiBaoHo;
		this.ghiChu = ghiChu;
		this.nguoiTao = nguoiTao;
		this.nguoiCapNhat = nguoiCapNhat;
	}

	// We can add a static method to the KhachHang class to get the number of records in the database.

	async create() {
		return await khachHangModel(this).save();
	}

	async update({ id }) {
		// 1. remove attr has null or undefined
		const objectParams = this;

		return await khachHangModel.findByIdAndUpdate(id, objectParams, {
			// if not exists, create new
			new: true,
		});
	}
}

module.exports = KhachHangFactory;
