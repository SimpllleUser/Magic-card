import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/topic/:id',
    name: 'TopicDetail',
    component: () => import('../pages/topics/detail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use the base URL from Vite environment variables
  routes // Short for `routes: routes`
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
