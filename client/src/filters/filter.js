import Vue from 'vue';
import { NHA_SAN_XUATS } from '@/constants/hangHoaConst';
import { GIOI_TINH_SU_DUNGS } from '@/constants/hangHoaConst';
import { PHIEU_XUAT_TYPES } from '@/constants/khoConst';
import { formatAddressObj, formatAddressWithComma } from '@/utils/Address';
import { formatVacXin } from '@/utils/DichVuVacXin';
import { filterPhuongThucThanhToan } from '@/utils/ThuNgan';

/**
 * Global filter to format address to string
 */
Vue.filter('formatAddressObj', formatAddressObj);

/**
 * Global filter to format address to string
 */
Vue.filter('formatAddressWithComma', formatAddressWithComma);

/**
 * Global loai kho
 */
Vue.filter('filterLoaiKho', function (loaiKho) {
	switch (loaiKho) {
		case 1:
			return 'Kho tổng';

		case 2:
			return 'Kho phòng tiêm';

		default:
			break;
	}
});
/**
 * Global loai kho
 */
Vue.filter('filterNhaSanXuat', function (id) {
	return NHA_SAN_XUATS.find((nhaSX) => nhaSX.id === id)?.name;
});
/**
 * Global loai kho
 */
Vue.filter('filterVacxin', formatVacXin);

/**
 * Format to 123,456
 */
Vue.filter('formatCurrency', function (value) {
	if (!isNaN(Number(value))) {
		value = Number(value);
	}

	if (typeof value !== 'number') {
		return value;
	}

	return value.toLocaleString('en-US');
});

Vue.filter('capitalizeFirstLetter', function (value) {
	if (typeof value !== 'string') {
		return value;
	}
	return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('filterGioiTinhSuDung', function (id) {
	return GIOI_TINH_SU_DUNGS.find((item) => {
		return item.id === id;
	})?.name;
});

Vue.filter('filterGiaFromDichVus', function (dichVus) {
	return dichVus.reduce((acc, current) => {
		return (acc += current.soLuong * current?.dichVu?.gia);
	}, 0);
});

Vue.filter('filterPhuongThucThanhToan', filterPhuongThucThanhToan);

Vue.filter('filterLoaiPhieuXuat', function (loaiPhieu) {
	return PHIEU_XUAT_TYPES[loaiPhieu];
});

Vue.filter('formatVaiTro', function (vaiTros) {
	return vaiTros
		.flatMap((vaiTro) => {
			return vaiTro.vaiTro?.ten;
		})
		.join(', ');
});
