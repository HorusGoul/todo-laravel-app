import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import SignUp from '@/components/SignUp.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    }
  ]
});
