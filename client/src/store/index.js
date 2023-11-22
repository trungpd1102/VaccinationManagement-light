import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { GIOI_TINH } from '@/constants';
import { formatDateForInput } from '@/utils/Date';

import kho from './kho';
import phieunhap from './phieunhap';
import phieuxuat from './phieuxuat';
import phieukham from './phieukham';
import hanghoa from './hanghoa';
import lichhentiem from './lichhentiem';
import thungan from './thungan';
import tiem from './tiem';
import users from './users';
import vaitro from './vaitro';
import thongke from './thongke';

export const store = new Vuex.Store({
	modules: {
		kho,
		phieukham,
		phieunhap,
		phieuxuat,
		hanghoa,
		lichhentiem,
		thungan,
		tiem,
		users,
		vaitro,
		thongke
	},
	state: {
		GIOI_TINH: GIOI_TINH,
		currentKhachHang: {},
		user: {},
		phieu: {},
		isShowSpinner: false,
		// currentSoPhieu: 1,
	},
	mutations: {
		setCurrentKhachHang: (state, currentKhachHang) => {
			if (currentKhachHang) {
				state.currentKhachHang = {
					...currentKhachHang,
					ngaySinh: formatDateForInput(currentKhachHang.ngaySinh),
				};
			} else state.currentKhachHang = currentKhachHang;
		},

		setUser: (state, user) => {
			state.user = user;
		},

		setPhieu: (state, phieu) => {
			state.phieu = phieu;
		},

		setIsShowSpinner: (state, isShowSpinner) => {
			state.isShowSpinner = isShowSpinner;
		},
		// setCurrentSoPhieu: (state, currentSoPhieu) => {
		// 	state.currentSoPhieu = currentSoPhieu;
		// },
	},
	getters: {
		userPermissions(state) {
			if (state.user?._id) {
				const permisstions = [];

				state.user.vaiTros.map((item) => {
					if (item?.vaiTro?.quyen) {
						for (const [key, value] of Object.entries(item?.vaiTro?.quyen)) {
							console.log(value.checked);
							if (value.checked) permisstions.push(key);
						}
					}
				});

				return [...new Set(permisstions)];
			}
		},
	},
});
