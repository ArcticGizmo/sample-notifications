import { createWebHistory, createRouter } from 'vue-router';

import FirebasePage from '@/pages/FirebasePage.vue';
import CourierPage from '@/pages/CourierPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/firebase',
    meta: {
      hide: true
    }
  },
  {
    path: '/firebase',
    name: 'Firebase',
    component: FirebasePage,
    meta: {
      src: 'firebase.svg'
    }
  },
  {
    path: '/courier',
    name: 'Courier',
    component: CourierPage,
    meta: {
      src: 'courier.svg'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
