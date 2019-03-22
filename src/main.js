import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import pinDirective from './shared/pin-directive';
import currencyFilter from './shared/currency-filter';

Vue.config.productionTip = false;

// Global directies and filters
Vue.directive('pin', pinDirective); // How to declare a global custom directive; available to all components
Vue.filter('currency', currencyFilter); // How to declare a global filter; available to all components

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
