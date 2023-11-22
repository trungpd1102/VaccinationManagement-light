import SeachableDropdown from '@/components/SeachableDropDown/SeachableDropDown.vue';

import khachHangService from '@/services/API/khachHang.service';
import { DAN_TOC, ADDRESS_TYPE, NGUOI_BAO_HO, KHACH_HANG_DEFAULT } from '@/constants';
import hanhChinhMixin from '@/mixins/hanhChinh.mixin';

import { mapState } from 'vuex';
import { notifyTopCenter, notifyTopRight } from '@/utils/Notify';
export default {
	components: {
		SeachableDropdown,
	},
	mixins: [hanhChinhMixin],
	data() {
		return {
			khachHang: KHACH_HANG_DEFAULT,

			danTocs: DAN_TOC,

			tinhThanhs: [],
			tamTru: {
				tinhThanhSelected: {},
				quanHuyens: [],
				quanHuyenSelected: {},
				xaPhuongs: [],
				xaPhuongSelected: {},
			},

			thuongTru: {
				tinhThanhSelected: {},
				quanHuyens: [],
				quanHuyenSelected: {},
				xaPhuongs: [],
				xaPhuongSelected: {},
			},
			isThuongTruSimilarTamTru: true,
			ADDRESS_TYPE: ADDRESS_TYPE,
		};
	},
	computed: {
		...mapState(['GIOI_TINH']),
		isValidNguoiBaoHo() {
			let isValid = false;

			if (this.khachHang.nguoiBaoHo.length < 1) {
				return true;
			}

			this.khachHang.nguoiBaoHo.forEach((nguoiBaoHo) => {
				isValid = !!nguoiBaoHo.loai && !!nguoiBaoHo.hoTen;
			});

			return isValid;
		},
		isValidated() {
			return (
				this.isValidNguoiBaoHo &&
				!!this.khachHang.hoTen &&
				!!this.khachHang.ngaySinh &&
				[0, 1, 2, '0', '1', '2'].includes(this.khachHang.gioiTinh) &&
				!!this.khachHang.danToc &&
				!!this.khachHang.tamTru.tinhTP &&
				!!this.khachHang.tamTru.quanHuyen &&
				!!this.khachHang.tamTru.xaPhuong &&
				!!this.khachHang.maTiemChung &&
				!!this.khachHang.dienThoai
			);
		},
	},
	methods: {
		CloseAdd() {
			this.$emit('CloseAddUser');
		},

		getDanToc(danToc) {
			this.khachHang.danToc = danToc;
		},

		onTinhThanh(tinhThanh, type) {
			this[type].tinhThanhSelected = tinhThanh;
			this.khachHang[type].tinhTP = tinhThanh.name;
		},

		async getQuanHuyens({ type }) {
			const tinhThanhCode = this[type]?.tinhThanhSelected?.code;
			const quanHuyens = await this.getBaseQuanHuyens(tinhThanhCode);
			this[type].quanHuyens = quanHuyens;
		},

		onQuanHuyen(quanhuyen, type) {
			this[type].quanHuyenSelected = quanhuyen;
			this.khachHang[type].quanHuyen = quanhuyen.name_with_type;
		},

		async getXaPhuongs({ type }) {
			const quanHuyenCode = this[type].quanHuyenSelected.code;
			const xaPhuongs = await this.getBaseXaPhuongs(quanHuyenCode);
			this[type].xaPhuongs = xaPhuongs;
		},

		onXaPhuong(xaPhuong, type) {
			this[type].xaPhuongSelected = xaPhuong;
			this.khachHang[type].xaPhuong = xaPhuong.name_with_type;
		},

		addNguoiBaoHo() {
			this.khachHang.nguoiBaoHo.push(NGUOI_BAO_HO);
		},

		removeNguoiBaoHo(idx) {
			this.khachHang.nguoiBaoHo.splice(idx, 1);
		},

		async save({ isRegister }) {
			if (!this.isValidated) {
				notifyTopCenter.warning({
					message: 'Vui lòng nhập đủ thông tin có dấu sao!',
				});
				return;
			}

			if (this.isThuongTruSimilarTamTru) {
				this.khachHang.thuongTru = this.khachHang.tamTru;
			}

			const [res, err] = await khachHangService.create(this.khachHang);
			if (err) {
				notifyTopRight.error({ message: 'Không thể tạo khách hàng' });
				return;
			}
			notifyTopRight.success({ message: 'Tạo thành công' });

			if (isRegister) {
				this.CloseAdd();
				this.$eventBus.$emit('show-registration-form', res.metadata);
				return;
			}

			this.CloseAdd();
			this.$eventBus.$emit('reload-khach-hang');
		},

		async saveAndRegister() {
			await this.save({ isRegister: true });
		},
	},
};
