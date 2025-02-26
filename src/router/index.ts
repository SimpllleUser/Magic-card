import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
