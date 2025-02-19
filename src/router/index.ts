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
      },
      {
        path: '/topic/update/:id',
        name: 'TopicUpdate',
        component: () => import('../pages/topics/update.vue'),
        meta: { title: 'Topic update' }
      },
      {
        path: '/topic/create',
        name: 'TopicCreate',
        component: () => import('../pages/topics/create.vue'),
        meta: { title: 'Topic Create' }
      },
      {
        path: '/quize',
        name: 'Quize',
        component: () => import('../pages/quize/index.vue'),
        meta: { title: 'Quize' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
    // meta: { title: 'Quize' }
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
