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
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/login/LoginPage.vue'),
    },
    {

      path: '/admin',
      name: 'MainAdminPage',
      component: () => import('@/views/admin/main/MainAdminPage.vue'),
      redirect: { name: 'EventPage' },
      children: [
        {
          path: 'events',
          name: 'EventPage',
          component: () => import('@/views/admin/event/EventPage.vue'),
        },
        {
          path: 'activities/event/:eventId/',
          name: 'ActivityPage',
          component: () => import('@/views/admin/activity/ActivityPage.vue'),
        },
        {
          path: 'professional',
          name: 'ProfessionalPage',
          component: () => import('@/views/admin/professional/ProfessionalPage.vue'),
        },
        {
          path: 'users',
          name: 'UserPage',
          component: () => import('@/views/admin/user/UserPage.vue'),
        }
      ]
    },
  ],
});
