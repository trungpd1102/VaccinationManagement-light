'use strict';

const KhachHangService = require('../services/khachHang.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');
const { HEADER } = require('../constants/index');

class KhachHangController {
	createKhachHang = async (req, res, next) => {
		req.body.nguoiTao = req.headers[HEADER.CLIENT_ID];
		req.body.nguoiCapNhat = req.headers[HEADER.CLIENT_ID];
		new CREATED({
			message: 'Created new KhachHang success!',
			metadata: await KhachHangService.createKhachHang(req.body),
		}).send(res);
	};

	updateKhachHang = async (req, res, next) => {
		new SuccessResponse({
			message: 'Update KhachHang success!',
			metadata: await KhachHangService.updateKhachHang({
				id: req.params.id,
				bodyUpdate: req.body,
			}),
		}).send(res);
	};

	insertFieldIntoKhachHangs = async (req, res, next) => {
		new SuccessResponse({
			message: 'Insert field into KhachHang success!',
			metadata: await KhachHangService.insertFieldIntoKhachHangs({
				query: req.body.query,
				update: req.body.updateBody,
			}),
		}).send(res);
	};

	deleteKhachHang = async (req, res, next) => {
		new SuccessResponse({
			message: 'Delete KhachHang success!',
			metadata: await KhachHangService.deleteKhachHang({
				id: req.params.id,
			}),
		}).send(res);
	};

	getPaginatedKhachHangs = async (req, res, next) => {
		new SuccessResponse({
			message: 'get paginated KhachHang success!',
			metadata: await KhachHangService.getPaginatedKhachHangs({
				page: req.query.page,
				limit: req.query.limit,
			}),
		}).send(res);
	};

	getListSearchKhachHangs = async (req, res, next) => {
		new SuccessResponse({
			message: 'get getListSearchKhachHangs success!',
			metadata: await KhachHangService.searchKhachHangs({
				keySearch: req.params.keySearch,
				page: req.query.page,
				limit: req.query.limit,
			}),
		}).send(res);
	};
	searchNangCaoPaginated = async (req, res, next) => {
		console.log({ query: req.query });
		new SuccessResponse({
			message: 'searchNangCaoPaginated success!',
			metadata: await KhachHangService.searchNangCaoPaginated({
				keySearch: req.params.keySearch,
				page: req.query.page,
				limit: req.query.limit,
				ngaySinhFrom: req.query.ngaySinhFrom,
				ngaySinhTo: req.query.ngaySinhTo,
			}),
		}).send(res);
	};
}

module.exports = new KhachHangController();
