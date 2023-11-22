<template>
	<div id="app">
		<Spinner v-show="isShowSpinner"></Spinner>
		<router-view />
		<notifications group="notify" width="500" />
		<notifications group="alert" width="600" position="center top" />
	</div>
</template>

<script>
import Spinner from '@/components/Spinner/Spinner.vue';
import socketClient from './services/Socket/socket';
import { mapState } from 'vuex';

export default {
	name: 'App',
	components: { Spinner },
	computed: {
		...mapState(['user', 'isShowSpinner']),
	},
	watch: {
		user: {
			handler: function (newUser) {
				if (newUser?.coSoTiemChung) {
					socketClient.send('join', newUser?.coSoTiemChung._id);
				}
			},
		},
	},
	mounted() {
		socketClient.listen('joined', (room) => {
			console.log('joined', room);
		});
	},
};
</script>

<style src="./App.css"></style>
<style src="./assets/styles/css/init.css"></style>
<style src="./assets/styles/css/variables.css"></style>
<style src="./assets/styles/css/custom.css"></style>
<style src="./assets/styles/css/transition.css"></style>
