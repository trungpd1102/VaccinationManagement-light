import { remainingUsageDays } from '@/utils/Date';
import { HAN_DU_DUNG_TYPES } from '@/constants/khoConst';

const filterLoaiHH = (tonKho, loaiHH) => {
	const result = tonKho.filter((item) => {
		return item?.maPhieuCT?.dichVu?.hangHoa?.loaiHangHoa == loaiHH;
	});

	return result;
};
const filterHanSuDung = (tonKho, hanSuDungId) => {
	// const remainingDays = remainingUsageDays(hanSuDungId)(hanSuDungId);

	const type = HAN_DU_DUNG_TYPES.find((item) => {
		return item?.id === hanSuDungId;
	});

	const result = tonKho.filter((item) => {
		const remainingDays = remainingUsageDays(item?.maPhieuCT?.hanSuDung);

		return remainingDays > type?.remain?.min && remainingDays <= type?.remain?.max;
	});

	return result;
};

const filterKeyWord = (tonKho, keyWord) => {
	const result = tonKho.filter((item) => {
		return (
			item.maPhieuCT?.loSanXuat.toLowerCase().includes(keyWord.toLowerCase()) ||
			item.maPhieuCT?.dichVu?.ten.toLowerCase().includes(keyWord.toLowerCase())
		);
	});

	return result;
};

export { filterLoaiHH, filterHanSuDung, filterKeyWord };
