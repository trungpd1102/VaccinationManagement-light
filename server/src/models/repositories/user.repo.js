const safetyCount = require('../../helpers/safetyCount');

const findAllUser = async ({ model, page, limit }) => {
	const count = await safetyCount({ model });
	const AllRecords = await model
		.find({ isDeleted: false })
		.sort({ updatedAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit * 1)
		.populate({ path: 'coSoTiemChung' })
		.populate({ path: 'kho' })
		.populate('vaiTros.vaiTro')
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

const findAllUserByCSTC = async ({ model, CSTCId }) => {
	const AllRecords = await model
		.find({ isDeleted: false, coSoTiemChung: CSTCId })
		.sort({ createdAt: -1 })
		.populate('vaiTros.vaiTro')
		.lean()
		.exec();

	return AllRecords;
};

module.exports = {
	findAllUser,
	findAllUserByCSTC,
};
