import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'RootPage',
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
      meta: { onlyLogged: true },
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

router.beforeEach((to: any, from: any, next: any) => {
  to.matched.some((record: any) => {
    if (record.meta.onlyLogged) {
      if (localStorage.getItem('isLogged') === 'true') {
        next()
      } else {
        next({ path: '/', })
      }
    } else {
      next()
    }
  })
})

export default router