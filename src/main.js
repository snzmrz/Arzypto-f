import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false;
require('bootstrap/js/src/index');
window.Vue = require('vue');
Vue.component('App', { App});
window.axios = require('axios');
import 'bootstrap/dist/css/bootstrap.css';
import JQuery from 'jquery';
window.$ = JQuery;
window.$ = window.jQuery = require('jquery');
import BitcoinInfo from './components/BitcoinInfo.vue';
Vue.component('BitcoinInfo', BitcoinInfo);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
