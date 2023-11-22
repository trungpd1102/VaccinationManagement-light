import AccessService from '@/services/API/access.service';
import { notifyTopCenter } from '@/utils/Notify';

export default {
	name: 'LoginScreen',
	data() {
		return {
			emailOrUsername: '',
			password: '',
		};
	},
	methods: {
		async submit() {
			const [res, err] = await AccessService.login({
				emailOrUsername: this.emailOrUsername,
				password: this.password,
			});

			if (err && err.message.includes('locked')) {
				console.log({ err });

				notifyTopCenter.warning({
					message: 'Tài khoản đã bị khóa',
				});
				return;
			}

			if (err && err.message.includes('not registered')) {
				notifyTopCenter.warning({
					message: 'Tài khoản không tồn tại',
				});
				return;
			}

			if (err && err.message.includes('Authentication failed')) {
				notifyTopCenter.warning({
					message: 'Mật khẩu không đúng',
				});
				return;
			}

			if (err) {
				notifyTopCenter.warning({
					message: 'Có lỗi không xác định xảy ra',
				});
				return;
			}

			window.sessionStorage.setItem('userId', res.metadata?.user?._id);
			window.sessionStorage.setItem('accessToken', res.metadata?.tokens?.accessToken);
			window.sessionStorage.setItem('refreshToken', res.metadata?.tokens?.refreshToken);

			this.$router.push('/dashboard');
		},
	},
};
