import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/default.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/index.vue'),
        meta: { title: 'Home' }
      },
      {
        path: '/topic/:id',
        name: 'TopicDetail',
        component: () => import('../pages/topics/detail.vue'),
        meta: { title: 'Topic detail' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
