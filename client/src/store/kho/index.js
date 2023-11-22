import { getField, updateField } from 'vuex-map-fields';
import danhSachKhoService from '@/services/API/danhSachKho.service';
import khoService from '@/services/API/kho.service';

import { remainingUsageDays } from '@/utils/Date';
import { filterLoaiHH, filterHanSuDung, filterKeyWord } from './function';

export default {
	namespaced: true,
	state: {
		dsKho: [],
		tonKho: [],
		tonKhoOrigin: [],
		tonKhoForChiDinh: [],
	},

	actions: {
		async getAllKhos({ commit }) {
			const [res, err] = await danhSachKhoService.getAll();

			if (err) return;

			commit('SET_DS_KHO', res.metadata);
		},

		async getTonKho({ commit }, { kho }) {
			const [res, err] = await khoService.getTonKho({ kho });

			if (err) return;

			const tonKho = res.metadata.map((item) => {
				return { ...item, remainingUsageDays: remainingUsageDays(item?.maPhieuCT?.hanSuDung) };
			});

			commit('SET_TON_KHO_ORIGIN', tonKho);
		},

		async getTonKhoForChiDinh({ commit }, { kho }) {
			const [res, err] = await khoService.getTonKhoForChiDinh({ kho });

			if (err) return;

			const tonKho = res.metadata;

			commit('SET_TON_KHO_FOR_CHI_DINH', tonKho);
		},

		totalSearch({ commit, state }, { loaiHHSelected, hanSuDung, searchKeyword }) {
			if (!state.tonKhoOrigin) return;

			// Shallow copy
			let searchResult = [...state.tonKhoOrigin];

			if (loaiHHSelected) {
				searchResult = filterLoaiHH(searchResult, loaiHHSelected);
			}

			if (hanSuDung) {
				searchResult = filterHanSuDung(searchResult, hanSuDung);
			}

			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}

			commit('SET_TON_KHO', searchResult);
		},
	},
	mutations: {
		updateField,

		SET_DS_KHO(state, payload) {
			state.dsKho = payload;
		},

		SET_TON_KHO(state, payload) {
			state.tonKho = payload;
		},

		SET_TON_KHO_FOR_CHI_DINH(state, payload) {
			state.tonKhoForChiDinh = payload;
		},

		SET_TON_KHO_ORIGIN(state, payload) {
			state.tonKhoOrigin = payload;
		},
	},
	getters: {
		getField,

		totalTonKho(state) {
			return state.tonKho.reduce((total, current) => {
				return (total += current.soLuong);
			}, 0);
		},

		totalCurrencyTonKho(state) {
			return state.tonKho.reduce((total, current) => {
				return (total +=
					current.soLuong * (current?.maPhieuCT?.giaSauThue || current?.maPhieuCT?.giaTruocThue));
			}, 0);
		},
	},
};
