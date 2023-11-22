import SideBar from '@/components/SideBar/SideBar.vue';
import BacSiScreen from './BacSiScreen/BacSiScreen.vue';
import KeToanScreen from './KeToanScreen/KeToanScreen.vue';
import LeTanScreen from './LeTanScreen/LeTanScreen.vue';
import TiemScreen from './TiemScreen/TiemScreen.vue';

import AccessService from '@/services/API/access.service';
import { mapState } from 'vuex';
import { notifyTopRight } from '@/utils/Notify';

const NAV_ITEM_IDS = {
	LE_TAN: 0,
	BAC_SI: 1,
	KE_TOAN: 2,
	TIEM: 3,
};

export default {
	name: 'DashBoard',
	components: {
		SideBar,
		'bac-si': BacSiScreen,
		'ke-toan': KeToanScreen,
		'le-tan': LeTanScreen,
		tiem: TiemScreen,
	},
	data() {
		return {
			currentTab: {},
			navItems: [
				{
					id: NAV_ITEM_IDS.LE_TAN,
					routeName: 'letan',
					label: 'Lễ Tân',
					icon: 'fa-solid fa-user',
					linkname: 'danhsachkhachhang',
					active: false,
				},
				{
					id: NAV_ITEM_IDS.BAC_SI,
					routeName: 'bacsi',
					label: 'Bác Sĩ',
					icon: 'fa-solid fa-stethoscope',
					linkname: 'bacsi',
					active: false,
				},
				{
					id: NAV_ITEM_IDS.KE_TOAN,
					routeName: 'ketoan',
					label: 'Kế Toán',
					icon: 'fa-solid fa-file-lines',
					linkname: '',
					active: false,
				},
				{
					id: NAV_ITEM_IDS.TIEM,
					routeName: 'tiem',
					label: 'Tiêm',
					icon: 'fa-solid fa-syringe',
					linkname: '',
					active: false,
				},
			],
		};
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		async logout() {
			const [res, err] = await AccessService.logout();
			console.log(res);

			if (err) {
				console.log(err);
				notifyTopRight.error({ message: 'Không thể đăng xuất' });

				return;
			}

			this.removeTempData();

			this.$router.push('/login');
		},

		removeTempData() {
			window.sessionStorage.setItem('userId', '');
			window.sessionStorage.setItem('accessToken', '');
			window.sessionStorage.setItem('refreshToken', '');
			this.$store.commit('setUser', {});
		},
		onNavNavigate(item) {
			this.currentTab = item;
		},
	},
};
