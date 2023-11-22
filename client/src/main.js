import Vue from 'vue';
import App from './App.vue';

import router from './routes/routes';
import { store } from './store';
import './filters';
import socketClient from './services/Socket/socket';

//event bus
import './utils/EventBus.js';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Notifications from 'vue-notification';
Vue.use(Notifications);
import vClickOutside from 'v-click-outside';

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './validators';
Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);

Vue.use(vClickOutside);
// Setup socket connection
socketClient.setup();
socketClient.listen('connect', function (reason) {
	console.log({ socketEvent: 'Connected! ', reason });
});
socketClient.listen('disconnect', function (reason) {
	console.log({ socketEvent: 'Disconnected! ', reason });
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
