import { RouteRecordRaw } from 'vue-router';

export const route: RouteRecordRaw = {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('src/pages/ModulesList/ui/ModulesList.vue')
    }
  ]
};
