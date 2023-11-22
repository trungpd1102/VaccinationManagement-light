import ApiService from './api.service';
import { LIMIT_PER_QUERY } from '@/constants/index';

const serviceURL = 'khachhang';
const khachHangService = {
	getAll({ page }) {
		return ApiService.get(
			`${serviceURL}`,
			{
				'x-api-key': process.env.VUE_APP_API_KEY,
				'x-client-id': window.sessionStorage.getItem('userId'),
				authorization: window.sessionStorage.getItem('accessToken'),
			},
			{
				page: page,
				limit: LIMIT_PER_QUERY,
			}
		);
	},

	search({ searchText, page }) {
		return ApiService.get(
			`${serviceURL}/search/${searchText}?page=${page}&limit=${LIMIT_PER_QUERY}`,
			{
				'x-api-key': process.env.VUE_APP_API_KEY,
				'x-client-id': window.sessionStorage.getItem('userId'),
				authorization: window.sessionStorage.getItem('accessToken'),
			}
		);
	},

	searchNangCao({ searchText, page, ngaySinhFrom, ngaySinhTo }) {
		return ApiService.get(
			`${serviceURL}/timkiemnangcao/${searchText}?page=${page}&limit=${LIMIT_PER_QUERY}&ngaySinhFrom=${ngaySinhFrom}&ngaySinhTo=${ngaySinhTo}`,
			{
				'x-api-key': process.env.VUE_APP_API_KEY,
				'x-client-id': window.sessionStorage.getItem('userId'),
				authorization: window.sessionStorage.getItem('accessToken'),
			}
		);
	},

	create(body) {
		return ApiService.post(serviceURL, body, {
			'x-api-key': process.env.VUE_APP_API_KEY,
			'x-client-id': window.sessionStorage.getItem('userId'),
			authorization: window.sessionStorage.getItem('accessToken'),
		});
	},

	update(body) {
		const { _id, ...bodyWithoutId } = body;

		return ApiService.patch(`${serviceURL}/update/${_id}`, bodyWithoutId, {
			'x-api-key': process.env.VUE_APP_API_KEY,
			'x-client-id': window.sessionStorage.getItem('userId'),
			authorization: window.sessionStorage.getItem('accessToken'),
		});
	},

	delete(id) {
		return ApiService.delete(`${serviceURL}/${id}`, {
			'x-api-key': process.env.VUE_APP_API_KEY,
			'x-client-id': window.sessionStorage.getItem('userId'),
			authorization: window.sessionStorage.getItem('accessToken'),
		});
	},
};

export default khachHangService;
