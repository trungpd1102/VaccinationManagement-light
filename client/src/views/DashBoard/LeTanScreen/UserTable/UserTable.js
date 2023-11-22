import AddTable from './AddTable.vue';
import ModalFilter from '@/components/Modals/ModalFilter/ModalFilter.vue';

import ModalDetail from '@/components/ModalDetail/ModalDetail.vue';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue';
import BaseModal from '@/components/Modals/BaseModal/BaseModal.vue';

import khachHangService from '@/services/API/khachHang.service';
import { KHACH_HANG_DEFAULT } from '@/constants';

import { mapState } from 'vuex';

import { INIT_PAGE } from '@/constants/index';
import { notifyTopRight } from '@/utils/Notify';

export default {
	components: {
		AddTable,
		ModalFilter,
		ModalDetail,
		RegistrationForm,
		BaseModal,
	},
	props: {},
	data() {
		return {
			// Page data
			totalPages: INIT_PAGE,
			perPage: 1,
			currentPage: INIT_PAGE,

			// Handle modal display
			isShowModalDetail: false,
			isshowModalNangcao: false,
			isShowRegForm: false,
			showModalAddUser: false,

			// Displayed khachHang
			items: [],

			// Register khachHang
			khachHangRegisterInfo: {},

			// Search text
			searchText: '',
			isSearching: false,

			// Edit khachHang
			isShowEdit: false,

			// modal
			khachHangModalId: 'khach-hang-modal-id',
			dangKyModalId: 'dang-ky-modal-id',
		};
	},

	computed: {
		...mapState(['GIOI_TINH', 'user']),
	},

	watch: {
		/**
		 * Handle currentPage change after clicking page number
		 * @param {Number} newPage number of new page
		 */
		async currentPage(newPage) {
			// Handle clicking on search page with search
			if (this.isSearching && this.searchText) {
				await this.search({ page: newPage });
				return;
			}

			// Handle clicking on search page without search
			await this.getAllKhachHang({ page: newPage });
		},
	},
	methods: {
		toggleAddUser() {
			this.showModalAddUser = !this.showModalAddUser;
		},

		showModalNangcao() {
			console.log('đã show');
			this.isshowModalNangcao = !this.isshowModalNangcao;
		},
		ShowModalDetail(item) {
			// this.isShowModalDetail = !this.isShowModalDetail;
			this.$bvModal.show(this.khachHangModalId);

			this.$store.commit('setCurrentKhachHang', item);
		},

		ShowRegForm() {
			this.isShowRegForm = !this.isShowRegForm;
		},
		/**
		 *
		 * @param {Number} page number of page to show
		 * @returns
		 */
		async getAllKhachHang({ page }) {
			this.isSearching = false;

			const [res, err] = await khachHangService.getAll({
				page: page,
			});

			console.log({ res });

			if (err) {
				console.log(err);
				notifyTopRight.error({ message: 'Không thể lấy thông tin' });
				return;
			}

			const khachHangObj = res.metadata;

			this.items = khachHangObj.contents;
			this.totalPages = khachHangObj.totalPages;
		},

		async search({ page, isStart }) {
			if (!this.searchText) {
				await this.getAllKhachHang({ page: INIT_PAGE });

				return;
			}

			this.isSearching = true;
			const [res, err] = await khachHangService.search({
				page: page,
				searchText: this.searchText,
			});

			if (err) {
				console.log(err);
				notifyTopRight.error({ message: 'Không thể tìm kiếm' });
				return;
			}

			const khachHangObj = res.metadata;
			this.items = khachHangObj.contents;
			this.totalPages = khachHangObj.totalPages;
			if (isStart) {
				this.currentPage = 1;
			}
		},

		async onTimKiemNangCao({ searchText, ngaySinhFrom, ngaySinhTo, isStart = true }) {
			console.log({ searchText });
			if (!searchText) {
				await this.getAllKhachHang({ page: INIT_PAGE });

				return;
			}

			this.isSearching = true;
			const [res, err] = await khachHangService.searchNangCao({
				page: INIT_PAGE,
				searchText: searchText,
				ngaySinhFrom,
				ngaySinhTo,
			});

			if (err) {
				console.log(err);
				notifyTopRight.error({ message: 'Không thể tìm kiếm' });
				return;
			}

			const khachHangObj = res.metadata;
			this.items = khachHangObj.contents;
			this.totalPages = khachHangObj.totalPages;
			if (isStart) {
				this.currentPage = 1;
			}
		},

		register(khachHang) {
			this.$store.commit('setCurrentKhachHang', khachHang);
			this.$bvModal.show(this.dangKyModalId);
		},

		CloseShowRegForm() {
			this.$store.commit('setCurrentKhachHang', KHACH_HANG_DEFAULT);
			this.$bvModal.hide(this.dangKyModalId);
		},

		async onXoaThongTin() {
			await this.getAllKhachHang({ page: INIT_PAGE });
		},

		/******************************
		 * Event bus handler functions
		 *****************************/
		reloadKhachHangHandler() {
			this.getAllKhachHang({ page: 1 });
		},

		closeModalDetailHandler() {
			this.$bvModal.hide(this.khachHangModalId);
			this.$store.commit('setCurrentKhachHang', KHACH_HANG_DEFAULT);
		},

		showRegistrationFormHandler(khachHang) {
			this.$store.commit('setCurrentKhachHang', khachHang);
			this.$bvModal.show(this.dangKyModalId);
		},

		eventBusListeners() {
			this.$eventBus.$on('reload-khach-hang', this.reloadKhachHangHandler);
			this.$eventBus.$on('close-modal-detail', this.closeModalDetailHandler);
			this.$eventBus.$on('show-registration-form', this.showRegistrationFormHandler);
		},

		eventBusRemoveListeners() {
			this.$eventBus.$off('reload-khach-hang', this.reloadKhachHangHandler);
			this.$eventBus.$off('close-modal-detail', this.closeModalDetailHandler);
			this.$eventBus.$off('show-registration-form', this.showRegistrationFormHandler);
		},
		/**************************/
	},

	async mounted() {
		this.eventBusListeners();

		await this.getAllKhachHang({ page: INIT_PAGE });
	},

	destroyed() {
		this.eventBusRemoveListeners();
	},
};
