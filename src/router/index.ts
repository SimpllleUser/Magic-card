import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
