import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('src/pages/ModulesList')
    }
  ]
};

export default routes;
