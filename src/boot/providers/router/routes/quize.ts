import { RouteRecordRaw } from 'vue-router';

export const route: RouteRecordRaw = {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      name: 'QuizePage',
      path: '/quize/:id',
      component: () => import('src/pages/QuizePage/ui/QuizePage.vue')
    }
  ]
};
