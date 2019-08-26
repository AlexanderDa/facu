import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/root/RootPage.vue'),
    },
    {
      path: '/admin',
      name: 'MainAdminPage',
      component: () => import('@/views/admin/main/MainAdminPage.vue'),
    },
  ],
});
