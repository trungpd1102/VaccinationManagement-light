const USER_ROLES = {
	ADMIN: '0000',
	LE_TAN: '1111',
	BAC_SI: '2222',
	THU_NGAN: '3333',
	TIEM: '4444',
	KHO: '5555',
	DANH_MUC: '6666'
};

const LOAI_DV = {
	1: 'Tiêm chủng',
	2: 'Phí chỉ định',
};

const LOAI_KHO = {
	1: 'Kho tổng',
	2: 'Kho phòng tiêm',
};

const TIME_UNITS = {
	1: 'Tuần',
	2: 'Tháng',
	3: 'Tuổi',
};

const HEADER = {
	API_KEY: 'x-api-key',
	CLIENT_ID: 'x-client-id',
	AUTHORIZATION: 'authorization',
	REFRESHTOKEN: 'x-rtoken-id',
};

module.exports = {
	USER_ROLES,
	LOAI_DV,
	LOAI_KHO,
	TIME_UNITS,
	HEADER,
};
