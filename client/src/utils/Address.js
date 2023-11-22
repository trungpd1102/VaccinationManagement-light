const formatAddressObj = (addressObj) => {
	if (!addressObj) return '';

	if (addressObj?.chiTiet)
		return [
			addressObj?.chiTiet,
			addressObj?.xaPhuong,
			addressObj?.quanHuyen,
			addressObj?.tinhTP,
		].join(' - ');
	else return [addressObj?.xaPhuong, addressObj?.quanHuyen, addressObj?.tinhTP].join(' - ');
};
const formatAddressWithComma = (addressObj) => {
	if (!addressObj) return '';

	if (addressObj?.chiTiet)
		return [
			addressObj?.chiTiet,
			addressObj?.xaPhuong,
			addressObj?.quanHuyen,
			addressObj?.tinhTP,
		].join(', ');
	else return [addressObj?.xaPhuong, addressObj?.quanHuyen, addressObj?.tinhTP].join(', ');
};

// formatDienThoai = (dienThoai) => {
// 	return
// }
export { formatAddressObj, formatAddressWithComma };
