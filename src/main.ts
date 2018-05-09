import AuthService from '@/AuthService';
import Vue from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import UserService from '@/UserService';

AuthService.addAuthListener((token) => {
  if (token) {
    router.push({ name: 'dashboard' });
  } else {
    router.push({ name: 'login' });
  }
});

UserService.init();
AuthService.init();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
