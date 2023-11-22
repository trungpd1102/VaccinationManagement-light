import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import { store } from '@/store/index.js';

import UserService from '@/services/API/user.service';
import { checkRouteQuyen } from '@/constants/vaiTroConst';
import { notifyTopCenter } from '@/utils/Notify';

const routers = new Router({
	// mode: 'history',
	routes: [
		{
			name: 'Init',
			path: '/',
			component: () => import('@/views/LoginScreen/LoginScreen.vue'),
		},
		{
			name: 'LoginScreen',
			path: '/login',
			component: () => import('@/views/LoginScreen/LoginScreen.vue'),
		},
		{
			name: 'DashBoard',
			path: '/dashboard',
			component: () => import('@/views/DashBoard/DashBoard.vue'),
			children: [
				{
					path: '/letan',
					component: () => import('@/views/DashBoard/LeTanScreen/LeTanScreen.vue'),
				},

			],
		},
	],
});

const getUser = async (to, from, next) => {
	if (['/', '/login'].includes(to.path)) {
		return;
	}

	if (store.state.user._id) {
		return;
	}

	const [res, err] = await UserService.getById();
	if (err) {
		next({ path: '/login' });
		return;
	}

	console.log('get user success', res);
	store.commit('setUser', res.metadata);
};

routers.beforeEach(async (to, from, next) => {
	await getUser(to, from, next);

	if (!store.getters.userPermissions) {
		next();
		return;
	}

	if (store.getters.userPermissions.includes('quanTri')) {
		next();
		return;
	}

	let allowedRoutes = [];
	store.getters.userPermissions.map((item) => {
		allowedRoutes = allowedRoutes.concat(checkRouteQuyen[item]);
	});
	
	if (!allowedRoutes.includes(to.path)) {
		console.log('blocked route');
		notifyTopCenter.warning({ message: 'Không có quyền truy cập' });
		next(false);
	} else next();
});

export default routers;
