window.$ = window.jQuery = require('jquery');

window.Vue = require('vue');

Vue.component('navigation', require('./components/navigation.vue'));

window.bus = new Vue();

const app = new Vue({
	el: '#app',

	mounted() {
		console.log('app mounted');
	}
});