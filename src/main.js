import '@babel/polyfill';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faTwitter, faGithub, faLinkedinIn);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
