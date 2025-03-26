import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory('/MagicCard/'),
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
