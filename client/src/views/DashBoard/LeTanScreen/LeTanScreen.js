import UserTabe from './UserTable/UserTable.vue';
import RegisteredPhieu from '@/components/RegisteredPhieu/RegisteredPhieu.vue';
import LichHenTiem from '@/components/LichHenTiem/LichHenTiem.vue';

export default {
	name: 'LeTan',
	components: {
		'user-table': UserTabe,
		'registered-phieu': RegisteredPhieu,
		'schedule-injection': LichHenTiem,
	},
	data() {
		return {
			currentComponent: {
				name: 'UserTable',
				alias: 'user-table',
				label: 'Danh sách',
			},
			componentItems: [
				{
					name: 'UserTable',
					alias: 'user-table',
					label: 'Danh sách',
				},
				{
					name: 'Registered',
					alias: 'registered-phieu',
					label: 'Đã đăng ký',
				},
				{
					name: 'LichHenTiem',
					alias: 'schedule-injection',
					label: 'Lịch hẹn tiêm',
				},
			],

			// Type Object
			khachHangObj: null,
		};
	},
	methods: {
		onSelectComponent(item) {
			this.currentComponent = item;
		},
	},
};
