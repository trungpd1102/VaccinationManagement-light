'use strict';

const safetyCount = require('../../helpers/safetyCount');
const dayjs = require('dayjs');

const findAllPaginated = async ({ model, page, limit }) => {
	const count = await safetyCount({ model: model });
	const AllRecords = await model
		.find({ isDeleted: false })
		.sort({ updatedAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit * 1)
		.lean()
		.exec();

	return {
		total: count,
		count: AllRecords.length,
		totalPages: Math.ceil(count / limit),
		currentPage: parseInt(page),
		contents: AllRecords,
	};
};

const findAllDoanhThu = async ({ model, page, limit, startDate, endDate }) => {
	const skip = (page - 1) * limit;

	const formatStartDate = dayjs(startDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
	const formatendDate = dayjs(endDate, 'YYYY/MM/DD').format('YYYY-MM-DD');

	const startDates = dayjs(`${formatStartDate}T00:00:00.000Z`); // 00:00:00 UTC
	const endDates = dayjs(`${formatendDate}T23:59:59.999Z`); // 23:59:59 UTC

	const Contents = await model.aggregate([
		{
			$match: {
				isDeleted: false,
				createdAt: {
					$gte: startDates.toDate(),
					$lte: endDates.toDate(),
				},
			}, // Lọc documents có isDeleted: false, va ngày tháng
		},
		{
			$lookup: {
				from: 'DichVus',
				localField: 'dichVu', //id để so sánh với tk dịch vụ
				foreignField: '_id', // id dẻ so sanh với tk phieuxuatCT
				as: 'dichVuInfo',
			},
		},
		{
			$unwind: '$dichVuInfo',
		},
		{
			$group: {
				_id: '$dichVu',
				soLuong: { $sum: 1 },
				donGia: { $first: '$donGia' },
				tenDichVu: { $first: '$dichVuInfo.ten' },
			},
		},
		{
			$sort: {
				tenDichVu: 1, // Sắp xếp tênDichVu A-Z
			},
		},
		{
			$group: {
				_id: null, // Đặt _id thành null để nhóm tất cả tài liệu lại thành một nhóm duy nhất
				total_count: { $sum: 1 }, // Đếm số tài liệu sau khi đã nhóm và lưu vào trường "total_count"
				contents: { $push: '$$ROOT' }, // Lưu tất cả các tài liệu sau khi đã nhóm vào một mảng "contents"
			},
		},
		{
			$project: {
				total_count: 1,
				totalPages: {
					$ceil: {
						$divide: ['$total_count', limit], // Tính totalPages dựa trên total_count và limitValue
					},
				},
				currentPage: `${page}`,
				contents: {
					$slice: ['$contents', skip, limit],
				},
				_id: 0, // Loại bỏ trường _id
			},
		},
	]);

	return {
		Contents,
	};
};

const findAllPaginatedAndPopulated = async ({ model, page, limit, populateDocument }) => {
	const count = await safetyCount({ model: model });

	const AllRecords = await model
		.find({ isDeleted: false })
		.sort({ updatedAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit * 1)
		.populate(populateDocument)
		.lean()
		.exec();

	return {
		total: count,
		count: AllRecords.length,
		totalPages: Math.ceil(count / limit),
		currentPage: parseInt(page),
		contents: AllRecords,
	};
};

const searchPaginated = async ({ model, keySearch, page, limit }) => {
	const regexSearch = new RegExp(keySearch);

	const count = await model
		.find(
			{
				$text: { $search: regexSearch },
				// TODO: --low-- check search results
				isDeleted: false,
			},
			{
				score: { $meta: 'textScore' },
			}
		)
		.countDocuments();

	const records = await model
		.find(
			{
				$text: { $search: regexSearch },
				// TODO: --hight-- check search results
				isDeleted: false,
			},
			{
				score: { $meta: 'textScore' },
			}
		)
		.sort({ updatedAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit * 1)
		.lean();

	return {
		total: count,
		count: records.length,
		totalPages: Math.ceil(count / limit),
		currentPage: parseInt(page),
		contents: records,
	};
};

const searchNangCaoPaginated = async ({
	model,
	keySearch,
	page,
	limit,
	ngaySinhFrom,
	ngaySinhTo,
}) => {
	const regexSearch = new RegExp(keySearch);
	console.log({ ngaySinhFrom, ngaySinhTo });
	const count = await model
		.find(
			{
				$text: { $search: regexSearch },
				// TODO: --low-- check search results
				isDeleted: false,
				ngaySinh: {
					$gte: dayjs(ngaySinhFrom == 'null' ? '1900-01-01' : ngaySinhFrom).startOf('day'),
					$lte: dayjs(ngaySinhTo == 'null' ? dayjs() : ngaySinhTo).endOf('day'),
				},
			},
			{
				score: { $meta: 'textScore' },
			}
		)
		.countDocuments();

	const records = await model
		.find(
			{
				$text: { $search: regexSearch },
				// TODO: --hight-- check search results
				isDeleted: false,
				ngaySinh: {
					$gte: dayjs(ngaySinhFrom == 'null' ? '1900-01-01' : ngaySinhFrom).startOf('day'),
					$lte: dayjs(ngaySinhTo == 'null' ? dayjs() : ngaySinhTo).endOf('day'),
				},
			},
			{
				score: { $meta: 'textScore' },
			}
		)
		.sort({ updatedAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit * 1)
		.lean();

	return {
		total: count,
		count: records.length,
		totalPages: Math.ceil(count / limit),
		currentPage: parseInt(page),
		contents: records,
	};
};

const safetyDelete = async ({ model, id }) => {
	return await model.updateOne({ _id: id }, { isDeleted: true });
};

const createWithNguoiTao = async ({ model, userId, payload }) => {
	payload.nguoiTao = userId;
	return await model.create(payload);
};

const getAll = async ({ model }) => {
	return await model.find().sort({ updatedAt: -1 }).lean().exec();
};

module.exports = {
	findAllPaginated,
	searchPaginated,
	findAllPaginatedAndPopulated,
	safetyDelete,
	createWithNguoiTao,
	getAll,
	findAllDoanhThu,
	searchNangCaoPaginated,
};
