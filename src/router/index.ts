import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { routes } from './routes';

const history = import.meta.env.MODE === 'development' ? createWebHistory() : createWebHashHistory();

const router = createRouter({
  history,
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
